import AsyncStorage from "@react-native-async-storage/async-storage";

const STORAGE_KEY = '@BreakReminder'

export const saveAppState = async (state) => {
    try {
        const jsonState = JSON.stringify(state);
        await AsyncStorage.setItem(STORAGE_KEY, jsonState);
    } catch (error) {
        console.log('Error saving state..', error);
    }
}

export const loadAppState = async () => {
    try {
        const jsonState = await AsyncStorage.getItem(STORAGE_KEY);
        if (jsonState != null) {
            const state = JSON.parse(jsonState);
            return state;
        }
    } catch (error) {
        console.log('No saved state found!', error);
        return null;
    }
}

export const clearAppState = async () => {
    try {
        await AsyncStorage.removeItem(STORAGE_KEY);
    } catch (e) {
        console.error('Error clearing app state:', e);
    }
}