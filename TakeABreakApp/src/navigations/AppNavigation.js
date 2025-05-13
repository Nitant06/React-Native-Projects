import React from 'react'; // Import React
import { createStackNavigator } from '@react-navigation/stack';
import { useTimer } from '../context/TimerContext';
import { NavigationContainer } from '@react-navigation/native';
import SetupScreen from '../screens/SetupScreen';
import ActiveScreen from '../screens/ActiveScreen';

const Stack = createStackNavigator();

const AppNavigation = () => {
    const { currentPhase, isLoading, isTimerRunning } = useTimer();

    if (isLoading) {
        return null;
    }

    const initialRouteName = (isTimerRunning && (currentPhase === 'work' || currentPhase === 'break')) ? 'Active' : 'Setup';

    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName={initialRouteName}>
                <Stack.Screen
                    name="Setup"
                    component={SetupScreen}
                    options={{ title: 'Set Schedule' }}
                />
                <Stack.Screen
                    name="Active"
                    component={ActiveScreen}
                    options={{ title: 'Break Reminder Running' }}
                />
            </Stack.Navigator>
        </NavigationContainer>
    );
}

export default AppNavigation;















// import { View, Text } from 'react-native'
// import React from 'react'
// import { createStackNavigator } from '@react-navigation/stack'
// import { useTimer } from '../context/TimerContext';
// import { NavigationContainer } from '@react-navigation/native';
// import SetupScreen from '../screens/SetupScreen';
// import ActiveScreen from '../screens/ActiveScreen';

// const Stack = createStackNavigator();

// const AppNavigation = () => {

//     const { currentPhase, isLoading } = useTimer();

//     if (isLoading) {
//         return null;
//     }

//     const initialRouteName = (currentPhase === 'stopped') ? 'Setup' : 'Active';

//     const initialScreen = (currentPhase === 'stopped') ? 'Setup' : 'Active';

//     return (
//         <NavigationContainer>
//             <Stack.Navigator
//                 initialRouteName={initialScreen}
//             >
//                 <Stack.Screen
//                     name="Setup"
//                     component={SetupScreen}
//                     options={{ title: 'Set Schedule' }}
//                 />
//                 <Stack.Screen
//                     name="Active"
//                     component={ActiveScreen}
//                     options={{ title: 'Break Reminder' }}
//                 />
//             </Stack.Navigator>
//         </NavigationContainer>
//     )
// }

// export default AppNavigation;