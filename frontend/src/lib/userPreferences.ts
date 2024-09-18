import AsyncStorage from '@react-native-async-storage/async-storage'

const MOBILITY_TRACKING_ENABLED_KEY = 'MOBILITY_TRACKING_ENABLED'

const getIsMobilityTrackingEnabled = async () => {
  const value = await AsyncStorage.getItem(MOBILITY_TRACKING_ENABLED_KEY)
  if (!value) return true
  return JSON.parse(value) as boolean
}

const setIsMobilityTrackingEnabled = async (isEnabled: boolean) => {
  await AsyncStorage.setItem(MOBILITY_TRACKING_ENABLED_KEY, JSON.stringify(isEnabled))
}

export default {
  getIsMobilityTrackingEnabled,
  setIsMobilityTrackingEnabled,
}
