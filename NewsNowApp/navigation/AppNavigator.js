import { View, Text } from 'react-native'
import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import { NavigationContainer } from '@react-navigation/native';
import HomeScreen from '../screens/HomeScreen';
import ArticleDetailScreen from '../screens/ArticleDetailScreen';


const Stack = createStackNavigator();

const AppNavigator = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="Home">
                <Stack.Screen
                    name="Home"
                    component={HomeScreen}
                    options={{ title: "Today's Headlines" }}
                />
                <Stack.Screen
                    name="ArticleDetail"
                    component={ArticleDetailScreen}
                    options={{ title: 'Full Article' }}
                />
            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default AppNavigator;