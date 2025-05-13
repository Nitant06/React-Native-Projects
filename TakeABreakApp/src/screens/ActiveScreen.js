import { Button, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState, useRef } from 'react' // Added useRef
import { useTimer } from '../context/TimerContext'
import TimeFormat from '../utils/TimeFormat';

const ActiveScreen = ({ navigation }) => {
    const {
        currentPhase,
        currentIntervalEndTime,
        isTimerRunning,
        stopTimer,
        checkTimeAndTransition
    } = useTimer();

    const [timeLeftDisplay, setTimeLeftDisplay] = useState(0);
    const intervalRef = useRef(null);

    useEffect(() => {
        const updateTimer = () => {
            if (isTimerRunning && currentIntervalEndTime !== null) {
                const now = Date.now();
                const remaining = Math.floor((currentIntervalEndTime - now) / 1000);
                setTimeLeftDisplay(Math.max(0, remaining));

                if (remaining <= 0) {
                    console.log("ActiveScreen: Time is up, calling checkTimeAndTransition.");
                    checkTimeAndTransition();
                }
            } else {
                setTimeLeftDisplay(0);
            }
        };

        if (intervalRef.current) {
            clearInterval(intervalRef.current);
            intervalRef.current = null;
        }

        if (isTimerRunning && currentIntervalEndTime !== null) {
            updateTimer();
            intervalRef.current = setInterval(updateTimer, 1000);
        } else {
            setTimeLeftDisplay(0);
        }

        return () => {
            if (intervalRef.current) {
                clearInterval(intervalRef.current);
                intervalRef.current = null;
            }
        };
    }, [isTimerRunning, currentIntervalEndTime, checkTimeAndTransition]);

    const getStatusMessage = () => {
        if (!isTimerRunning || currentPhase === 'stopped') {
            return "Schedule Stopped";
        } else if (currentPhase === 'work') {
            return "Time until next break:";
        } else if (currentPhase === 'break') {
            return "Break time remaining:";
        }
        return "Loading...";
    };

    return (
        <View style={styles.container}>
            <Text style={styles.statusText}>{getStatusMessage()}</Text>

            {isTimerRunning && currentPhase !== 'stopped' && (
                <Text style={styles.timerText}>
                    {TimeFormat(timeLeftDisplay)}
                </Text>
            )}

            <View style={styles.buttonContainer}>
                {!isTimerRunning ? (
                    <Button title="Start Schedule (from Setup)" onPress={() => { navigation.navigate('Setup') }} />
                ) : (
                    <Button title="Stop Schedule" onPress={stopTimer} color="red" />
                )}
            </View>
        </View>
    )
}

export default ActiveScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    statusText: {
        fontSize: 22,
        marginBottom: 20,
        textAlign: 'center',
    },
    timerText: {
        fontSize: 60,
        fontWeight: 'bold',
        marginBottom: 30,
    },
    buttonContainer: {
        // Style to potentially space out buttons if you add more
    }
});