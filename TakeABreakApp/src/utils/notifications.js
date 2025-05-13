import * as Notifications from 'expo-notifications';

export async function requestNotificationPermission() {
    const { status: existingStatus } = await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;

    if (existingStatus !== 'granted') {
        console.log("Requesting notification permissions...");
        const { status } = await Notifications.requestPermissionsAsync();
        finalStatus = status;
    }

    if (finalStatus !== 'granted') {
        console.warn("Notification permissions not granted.");
        return false;
    }

    console.log("Notification permissions granted.");
    return true;
}

export async function scheduleBreakNotification(notificationTitle, notificationBody, whenToTriggerDate) {
    const scheduleTime = whenToTriggerDate.getTime();
    const now = Date.now();

    if (scheduleTime <= now + 1000) { // Check if time is past or within the next second
        console.warn(`Attempted to schedule notification in the past or too soon. Scheduled for: ${whenToTriggerDate}, Now: ${new Date(now)}`);

        if (scheduleTime <= now) return;
    }

    try {
        const notificationId = await Notifications.scheduleNotificationAsync({
            content: {
                title: notificationTitle,
                body: notificationBody,
                sound: 'default',
                priority: Notifications.AndroidNotificationPriority.HIGH,
                data: {
                    eventType: 'interval_end',
                    phase: notificationTitle.includes("Break Over") ? 'work_start' : 'break_start',
                },
            },
            trigger: {
                date: whenToTriggerDate,
            }
        });
        console.log(`Notification scheduled with ID: ${notificationId} for ${whenToTriggerDate.toISOString()}`);
        return notificationId;
    } catch (error) {
        console.error("Error scheduling notification:", error);
        return null;
    }
}

export async function cancelAllScheduledNotifications() {
    try {
        await Notifications.cancelAllScheduledNotificationsAsync();
        console.log('All pending notifications cancelled successfully.');
    } catch (error) {
        console.error("Error cancelling notifications:", error);
    }
}
