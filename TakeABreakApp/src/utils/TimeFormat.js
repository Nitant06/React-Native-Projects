import { View, Text } from 'react-native'
import React from 'react'

const TimeFormat = (seconds) => {
    if (seconds < 0) {
        seconds = 0;
    }

    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;

    const formattedMinutes = String(minutes).padStart(2, '0');
    const formattedSeconds = String(remainingSeconds).padStart(2, '0');

    return `${formattedMinutes}:${formattedSeconds}`;
}

export default TimeFormat