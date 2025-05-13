import { Alert, Button, StyleSheet, Text, TextInput, View } from 'react-native'
import React, { useEffect, useState } from 'react' // Removed useRef
import { useTimer } from '../context/TimerContext'
import { useNavigation } from '@react-navigation/native';

const SetupScreen = () => {
    const { breakLength, breakFrequency, setSettings, startTimer, currentPhase, isTimerRunning } = useTimer();
    const navigation = useNavigation();

    const [frequencyInput, setFrequencyInput] = useState(String(breakFrequency));
    const [lengthInput, setLengthInput] = useState(String(breakLength));

    useEffect(() => {
        if (isTimerRunning && (currentPhase === 'work' || currentPhase === 'break')) {
            console.log("SetupScreen: Timer is running, navigating to Active screen.");
            navigation.navigate('Active');
        }
    }, [isTimerRunning, currentPhase, navigation]);

    const scheduleHandler = async () => {
        const cleanedFrequencyInput = frequencyInput.trim().replace(/[^0-9]/g, '');
        const cleanedLengthInput = lengthInput.trim().replace(/[^0-9]/g, '');

        const frequency = parseInt(cleanedFrequencyInput, 10);
        const length = parseInt(cleanedLengthInput, 10);

        if (isNaN(frequency) || isNaN(length) || frequency <= 0 || length <= 0) {
            Alert.alert("Invalid Input", "Please enter valid positive numbers for frequency and length.");
            return;
        }

        setSettings(frequency, length);
        await startTimer();
        console.log('Settings saved and timer started.');
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Set your break schedule</Text>

            <View style={styles.inputGroup}>
                <Text style={styles.label}>Break Every (minutes):</Text>
                <TextInput
                    style={styles.input}
                    keyboardType="numeric"
                    value={frequencyInput}
                    onChangeText={setFrequencyInput}
                    placeholder="e.g., 60"
                />
            </View>

            <View style={styles.inputGroup}>
                <Text style={styles.label}>Break Length (minutes):</Text>
                <TextInput
                    style={styles.input}
                    keyboardType="numeric"
                    value={lengthInput}
                    onChangeText={setLengthInput}
                    placeholder="e.g., 10"
                />
            </View>

            <Button title="Save & Start Schedule" onPress={scheduleHandler} />
        </View>
    )
}

export default SetupScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 30,
    },
    inputGroup: {
        width: '80%',
        marginBottom: 20,
    },
    label: {
        fontSize: 18,
        marginBottom: 8,
        color: '#333',
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        paddingVertical: 10,
        paddingHorizontal: 15,
        fontSize: 16,
        borderRadius: 5,
        backgroundColor: '#fff',
    },
});