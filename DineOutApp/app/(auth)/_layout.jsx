import { Stack } from 'expo-router';

export default function AuthLayout() {
    return (
        <Stack screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Signup" options={{ title: 'Sign Up' }} />
            <Stack.Screen name="Login" options={{ title: 'Log In' }} />
        </Stack>
    );
}