import { Linking, Platform } from 'react-native'

/**
 * Opens the specific app's settings page in the native settings app on the device.
 */
const openAppSettings = async () => {
  try {
    if (Platform.OS === 'ios') {
      await Linking.openURL('app-settings:')
    } else {
      await Linking.openSettings()
    }
  } catch {
    // noop
  }
}

export default {
  openAppSettings,
}
