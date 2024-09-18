import { Platform } from 'react-native'
import * as TaskManager from 'expo-task-manager'
import * as Location from 'expo-location'
import AlertAsync from 'react-native-alert-async'
import LocationUpdate from '../models/LocationUpdate'
import api from './api'
import externalLinking from './externalLinking'

const LOCATION_TASK_NAME = 'background-location-task'

/**
 * Requests the user's permission to track their location in the background and starts background mobility tracking analysis.
 *
 * If this is the first launch of the app, the user will be presented with a system dialog for location tracking permission.
 * If they have previously denied permission, they will be presented with a custom dialog, prompting them to open the system settings app to grant permission.
 */
const requestPermissionsAndStart = async () => {
  // Android and iOS require foreground permissions to be granted before background permissions can be requested.
  // We don't care what the status is here, if it is granted, just fall through, if it is denied, requestBackgroundPermissionsAsync() will return the same anyway
  await Location.requestForegroundPermissionsAsync()

  const { status } = await Location.requestBackgroundPermissionsAsync()

  switch (status) {
    case Location.PermissionStatus.GRANTED:
      await Location.startLocationUpdatesAsync(LOCATION_TASK_NAME, {
        accuracy: Location.Accuracy.Balanced,
      })
      break
    case Location.PermissionStatus.DENIED:
      const description =
        'We use your device location as an indicator of your mobility to help predict post-natal depression. We will never store your data for any other purposes.' +
        (Platform.OS === 'ios'
          ? " Please grant this app the 'Always Allow' permission to access your 'Precise' location."
          : " Please grant this app the 'Allow all the time' permission to access your 'Precise' location.")

      await AlertAsync('Mobility Tracking Disabled', description, [
        { text: 'Dismiss', style: 'cancel' },
        { text: 'Open Settings', style: 'default', onPress: () => Promise.resolve(externalLinking.openAppSettings()) },
      ])
      break
    default:
      break
  }
}

/**
 * Stops background mobility tracking analysis.
 */
const stop = async () => {
  await Location.stopLocationUpdatesAsync(LOCATION_TASK_NAME)
}

/**
 * Checks if all the correct location permissions are granted to correctly receive background location updates.
 *
 * NOTE: Expo doesn't really grant proper visibility into granted system permissions e.g. we can't see if we have access to the
 * precise location and this seems a bit unreliable, but it's the best we've got.
 *
 * @returns A boolean indicating if all the correct user permissions are granted for receiving background location updates.
 */
const areCorrectPermissionsGranted = async () => {
  const permissions = await Location.getBackgroundPermissionsAsync()
  return permissions.granted
}

TaskManager.defineTask(LOCATION_TASK_NAME, (result: TaskManager.TaskManagerTaskBody<object>) => {
  // noop, an error has occurred, we'll just ignore it and try again when they next open the app
  if (result.error) return

  if (result.data) {
    const data = result.data as { locations: LocationUpdate[] }
    const location = data.locations[0]

    const payload = {
      longitude: location.coords.longitude,
      latitude: location.coords.latitude,
      timestamp: Math.round(location.timestamp / 1000),
    }

    api.taskAPIRequest('mobility-tracking', payload).catch((e) => void e)
  }
})

export default {
  requestPermissionsAndStart,
  stop,
  areCorrectPermissionsGranted,
}
