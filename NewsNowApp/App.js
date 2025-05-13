import React, { useCallback, useEffect, useState } from "react";
import AppNavigator from './navigation/AppNavigator';
import * as SplashScreen from 'expo-splash-screen';
import { View } from "react-native";

export default function App() {

  // SplashScreen.preventAutoHideAsync();

  // const [appIsReady, setAppIsReady] = useState(false);

  // useEffect(() => {
  //   async function prepare() {
  //     try {
  //       await new Promise(resolve => setTimeout(resolve, 3000));
  //     } catch (e) {
  //       console.warn(e);
  //     } finally {
  //       setAppIsReady(true);
  //     }
  //   }
  //   prepare();
  // }, []);

  // const onLayoutRootView = useCallback(async () => {
  //   if (appIsReady) {
  //     await SplashScreen.hideAsync();
  //   }
  // }, [appIsReady]);

  // if (!appIsReady) {
  //   return null;
  // }
  return (
    // <View style={{ flex: 1 }} onLayout={onLayoutRootView}>
    //   <AppNavigator />
    // </View>
    <AppNavigator />
  );
}

