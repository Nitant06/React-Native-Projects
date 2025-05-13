import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View, Text, ActivityIndicator } from 'react-native';
import { TimerProvider, useTimer } from './src/context/TimerContext';
import AppNavigation from './src/navigations/AppNavigation';
import * as Notifications from 'expo-notifications';
import { useEffect } from 'react';
import { requestNotificationPermission } from './src/utils/notifications';

Notifications.setNotificationHandler({
  handleNotification: async (notification) => {
    console.log("Notification received while app is foregrounded/backgrounded:", notification);
    return ({
      shouldShowBanner: true,
      shouldPlaySound: true,
      shouldSetBadge: false,
    });
  },
  handleSuccess: (notificationId) => {
    console.log('Notification handled successfully (e.g., displayed):', notificationId);
  },
  handleError: (notificationId, error) => {
    console.error('Error handling notification:', notificationId, error);
  },
});

const AppContent = () => {
  return <AppNavigation />;
};

export default function App() {
  useEffect(() => {
    const requestPermissionsOnStartup = async () => {
      console.log("Requesting notification permissions on app startup...");
      await requestNotificationPermission();
    };
    requestPermissionsOnStartup();

    const notificationResponseSubscription = Notifications.addNotificationResponseReceivedListener(response => {
      console.log('Notification tapped:', response.notification.request.content.data);
    });

    return () => {
      notificationResponseSubscription.remove();
    };
  }, []);

  return (
    <TimerProvider>
      <AppContent />
      <StatusBar style="auto" />
    </TimerProvider>
  );
}

const styles = StyleSheet.create({
  // loadingContainer is now within TimerProvider if you choose to keep it there
  // Or remove if AppNavigation handles its own null render during isLoading from context
});
















// import { StatusBar } from 'expo-status-bar';
// import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';
// import { TimerProvider, useTimer } from './src/context/TimerContext';
// import AppNavigation from './src/navigations/AppNavigation';
// import * as Notifications from 'expo-notifications';
// import * as TaskManager from 'expo-task-manager';
// import { BREAK_REMINDER_TASK_NAME } from './src/tasks/breakReminderTask';
// import { useEffect } from 'react';

// Notifications.setNotificationHandler({
//   handleNotification: async (notification) => {
//     return ({
//       shouldShowBanner: true,
//       shouldPlaySound: true,
//       shouldSetBadge: false,
//     });
//   }
// })


// // async function registerBackgroundReminderTask() {


// // }

// async function unregisterBackgroundReminderTask() {
//   const isRegistered = await TaskManager.isTaskRegisteredAsync(BREAK_REMINDER_TASK_NAME);
//   if (isRegistered) {
//     try {
//       await TaskManager.unregisterTaskAsync(BREAK_REMINDER_TASK_NAME);
//       console.log("Background reminder task unregistered.");
//     } catch (error) {
//       console.error("Failed to unregister background reminder task:", error);
//     }
//   }
// }

// const AppContent = () => {
//   const { isLoading, currentPhase } = useTimer();


//   if (isLoading) {
//     return (
//       <View style={styles.loadingContainer}>
//         <ActivityIndicator size="large" />
//         <Text>Loading...</Text>
//       </View>
//     )
//   }

//   return (
//     <AppNavigation />
//   )
// }

// export default function App() {
//   return (
//     <TimerProvider>
//       <AppContent />
//       <StatusBar style="auto" />
//     </TimerProvider>
//   );
// }

// const styles = StyleSheet.create({

//   loadingContainer: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//   }
// });
