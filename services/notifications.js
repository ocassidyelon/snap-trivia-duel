import * as Notifications from 'expo-notifications';
import { Platform } from 'react-native';

// Show notifications even when the app is open
Notifications.setNotificationHandler({
    handleNotification: async () => ({
        shouldShowBanner: true,
        shouldShowList: true,
        shouldPlaySound: true,
        shouldSetBadge: false,
    }),
});

export async function requestNotificationPermission() {
    if (Platform.OS === 'android') {
        await Notifications.setNotificationChannelAsync('default', {
            name: 'default',
            importance: Notifications.AndroidImportance.DEFAULT,
        });
    }

    const { status: existing } = await Notifications.getPermissionsAsync();
    if (existing === 'granted') return true;

    const { status } = await Notifications.requestPermissionsAsync();
    return status === 'granted';
}

export async function notifyMatchComplete(winnerName) {
    try {
        await Notifications.scheduleNotificationAsync({
            content: {
                title: '🏆 Match complete!',
                body: winnerName === 'Tie' ? "It's a tie! Rematch?" : `${winnerName} takes the win — play again?`,
            },
            trigger: null, // fire immediately
        });
    } catch (err) {
        console.warn('Match notification failed:', err);
    }
}

export async function scheduleDailyReminder() {
    await Notifications.cancelAllScheduledNotificationsAsync();
    await Notifications.scheduleNotificationAsync({
        content: {
            title: '🎯 Trivia time!',
            body: 'Daily duel ready — challenge a friend!',
        },
        trigger: {
            type: Notifications.SchedulableTriggerInputTypes.DAILY,
            hour: 19,
            minute: 0,
        },
    });
}

export async function cancelDailyReminder() {
    await Notifications.cancelAllScheduledNotificationsAsync();
}