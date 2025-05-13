import React, { createContext, useContext, useState, useEffect } from 'react';
import { loadAppState, saveAppState } from '../utils/storage';
import { requestNotificationPermission, scheduleBreakNotification, cancelAllScheduledNotifications } from '../utils/notifications';
import { View, ActivityIndicator, Text } from 'react-native';

// Define the initial state of the timer
const initialState = {
    breakLength: 10, // minutes
    breakFrequency: 60, // minutes
    isTimerRunning: false,
    currentPhase: 'stopped', // 'work', 'break', 'stopped'
    currentIntervalEndTime: null, // Timestamp when the current interval ends
    isLoading: true,
};

const TimerContext = createContext(initialState);

export const useTimer = () => useContext(TimerContext);

export const TimerProvider = ({ children }) => {
    const [state, setState] = useState(initialState);
    useEffect(() => {
        const loadState = async () => {
            try {
                const savedState = await loadAppState();
                if (savedState) {
                    const parsedState = {
                        ...initialState,
                        ...savedState,
                        breakLength: Number(savedState.breakLength) || initialState.breakLength,
                        breakFrequency: Number(savedState.breakFrequency) || initialState.breakFrequency,
                        currentIntervalEndTime: savedState.currentIntervalEndTime ? Number(savedState.currentIntervalEndTime) : null,
                    };

                    setState(prevState => ({
                        ...prevState,
                        ...parsedState,
                        isLoading: false,
                    }));


                    if (parsedState.isTimerRunning && parsedState.currentIntervalEndTime) {
                        if (Date.now() >= parsedState.currentIntervalEndTime) {
                            handleAppLoadTransition(parsedState);
                        } else {
                            console.log(`App Loaded: Timer running, interval end time is in the future.`);
                        }
                    } else {
                        console.log("App Loaded: Timer not running or no end time.");
                    }

                } else {
                    console.log("No saved state found.");
                    setState(prevState => ({ ...prevState, isLoading: false }));
                }
            } catch (error) {
                console.error("Error loading app state:", error);
                setState(prevState => ({ ...prevState, isLoading: false }));
            }
        };

        loadState();
    }, []);


    const handleAppLoadTransition = async (loadedState) => {
        console.log("handleAppLoadTransition based on loaded state:", loadedState);

        let nextPhase;
        let nextIntervalDuration; // in minutes
        let notificationTitle;
        let notificationBody;

        if (loadedState.currentPhase === 'work') {
            nextPhase = 'break';
            nextIntervalDuration = loadedState.breakLength;
            notificationTitle = "Break Over";
            notificationBody = "Time to get back to work";
        } else if (loadedState.currentPhase === 'break') {
            nextPhase = 'work';
            nextIntervalDuration = loadedState.breakFrequency;
            notificationTitle = "Time for a Break!";
            notificationBody = "Your work interval is done.";
        } else {
            console.log("handleAppLoadTransition: Unexpected phase, stopping timer.");
            const stoppedState = {
                ...loadedState,
                isTimerRunning: false,
                currentPhase: 'stopped',
                currentIntervalEndTime: null,
                isLoading: false,
            };
            await saveAppState(stoppedState);
            setState(stoppedState);
            await cancelAllScheduledNotifications();
            return;
        }

        const now = Date.now();
        const nextIntervalDurationMs = nextIntervalDuration * 60 * 1000;
        const newCurrentIntervalEndTime = now + nextIntervalDurationMs;

        const newState = {
            ...loadedState,
            isTimerRunning: true,
            currentPhase: nextPhase,
            currentIntervalEndTime: newCurrentIntervalEndTime,
            isLoading: false,
        };

        await saveAppState(newState);
        console.log("handleAppLoadTransition: State saved for next phase:", nextPhase, "New end time:", new Date(newCurrentIntervalEndTime));

        scheduleBreakNotification(notificationTitle, notificationBody, new Date(newCurrentIntervalEndTime));
        console.log(`handleAppLoadTransition: Scheduled notification for: ${new Date(newCurrentIntervalEndTime)}`);

        setState(newState);
    };


    const checkTimeAndTransition = () => {
        console.log("checkTimeAndTransition called.");
        setState(prevState => {
            if (!prevState.isTimerRunning || prevState.currentPhase === 'stopped' || prevState.currentIntervalEndTime === null) {
                return prevState;
            }

            const now = Date.now();
            if (now >= prevState.currentIntervalEndTime) {
                console.log(`checkTimeAndTransition: Time up for phase: ${prevState.currentPhase}`);

                let nextPhase;
                let nextIntervalDuration;
                let notificationTitle;
                let notificationBody;

                if (prevState.currentPhase === 'work') {
                    nextPhase = 'break';
                    nextIntervalDuration = prevState.breakLength;
                    notificationTitle = "Break over!";
                    notificationBody = "Time to get back to work.";
                } else if (prevState.currentPhase === 'break') {
                    nextPhase = 'work';
                    nextIntervalDuration = prevState.breakFrequency;
                    notificationTitle = "Time for a Break!";
                    notificationBody = "Your work interval is done.";
                } else {
                    console.log("checkTimeAndTransition: Unexpected phase, stopping timer.");
                    const stoppedState = {
                        ...prevState,
                        isTimerRunning: false,
                        currentPhase: 'stopped',
                        currentIntervalEndTime: null,
                    };
                    saveAppState(stoppedState);
                    cancelAllScheduledNotifications();
                    return stoppedState;
                }

                const nextIntervalDurationMs = nextIntervalDuration * 60 * 1000;
                const newCurrentIntervalEndTime = now + nextIntervalDurationMs;

                const newState = {
                    ...prevState,
                    currentPhase: nextPhase,
                    currentIntervalEndTime: newCurrentIntervalEndTime,
                };

                saveAppState(newState);
                console.log("checkTimeAndTransition: State saved for next phase:", nextPhase);

                scheduleBreakNotification(notificationTitle, notificationBody, new Date(newCurrentIntervalEndTime));
                console.log(`checkTimeAndTransition: Scheduled next notification for: ${new Date(newCurrentIntervalEndTime)}`);

                return newState;
            } else {
                return prevState;
            }
        });
    };

    const startTimer = async () => {
        console.log("--- startTimer function entered ---");
        let permissionsGranted = await requestNotificationPermission();
        if (!permissionsGranted) {
            Alert.alert("Permissions Required", "Notification permissions are needed to remind you.");
            setState(prevState => ({ ...prevState, isLoading: false }));
            return;
        }

        console.log("--- Permissions granted, continuing startTimer ---");

        await cancelAllScheduledNotifications();
        console.log("startTimer: Cleared any previous pending notifications.");

        setState(prevState => {
            if (prevState.currentPhase === 'stopped') {
                const now = Date.now();
                const workDurationMs = prevState.breakFrequency * 60 * 1000;
                const newCurrentIntervalEndTime = now + workDurationMs;

                const newState = {
                    ...prevState,
                    isTimerRunning: true,
                    currentPhase: 'work',
                    currentIntervalEndTime: newCurrentIntervalEndTime,
                    isLoading: false,
                };
                saveAppState(newState);

                scheduleBreakNotification("Time for a Break!", "Your work interval is done.", new Date(newCurrentIntervalEndTime));
                console.log(`startTimer: Scheduled first notification for: ${new Date(newCurrentIntervalEndTime)}`);

                return newState;
            } else {
                console.log("startTimer: Timer is already running or in a different phase.");
                return { ...prevState, isLoading: false };
            }
        });
        console.log("--- startTimer function finished ---");
    };

    const stopTimer = async () => {
        console.log("--- stopTimer function entered ---");
        await cancelAllScheduledNotifications();

        setState(prevState => {
            const newState = {
                ...prevState,
                isTimerRunning: false,
                currentPhase: 'stopped',
                currentIntervalEndTime: null,
                isLoading: false,
            };
            saveAppState(newState);
            console.log("--- stopTimer function finished ---");
            return newState;
        });
    };

    const setSettings = (frequency, length) => {
        console.log(`--- setSettings function entered: frequency: ${frequency}, length: ${length} ---`);
        setState(prevState => {
            const newState = {
                ...prevState,
                breakFrequency: frequency,
                breakLength: length,
            };
            saveAppState(newState);
            return newState;
        });
        console.log("--- setSettings function finished ---");
    };

    const contextValue = {
        ...state,
        setSettings,
        startTimer,
        stopTimer,
        checkTimeAndTransition,
    };


    return (
        <TimerContext.Provider value={contextValue}>
            {state.isLoading ? (
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <ActivityIndicator size="large" />
                    <Text>Loading App State...</Text>
                </View>
            ) : (
                children
            )}
        </TimerContext.Provider>
    );
};


