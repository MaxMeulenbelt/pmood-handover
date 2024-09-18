import * as Notifications from 'expo-notifications'

// Sends notifications at these hours daily
const notificationTimes: number[] = [10, 14, 19]

async function scheduleNotification() {
  // Cancel all previous notifications
  await Notifications.cancelAllScheduledNotificationsAsync()

  // Set handler to show alerts
  Notifications.setNotificationHandler({
    // eslint-disable-next-line @typescript-eslint/require-await
    handleNotification: async () => ({
      shouldShowAlert: true,
      shouldPlaySound: false,
      shouldSetBadge: false,
    }),
  })

  // For each set time, create notification
  // eslint-disable-next-line @typescript-eslint/no-misused-promises
  notificationTimes.forEach(async function (hour) {
    await Notifications.scheduleNotificationAsync({
      content: {
        title: 'Task Reminder',
        body: 'Time to complete the Read Your Mood task!',
      },
      trigger: {
        hour,
        minute: 0,
        repeats: true,
      },
    })
  })
}

async function requestPermissionsAsync() {
  return await Notifications.requestPermissionsAsync({
    ios: {
      allowAlert: true,
      allowBadge: true,
      allowSound: true,
      allowAnnouncements: true,
    },
  })
}

export default {
  scheduleNotification,
  requestPermissionsAsync,
}
