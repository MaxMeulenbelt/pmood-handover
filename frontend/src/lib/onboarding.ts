import AsyncStorage from '@react-native-async-storage/async-storage'

const HAS_COMPLETED_ONBOARDING_KEY = 'API_ACCESS_TOKEN'

const getHasCompletedOnboarding = async () => {
  const value = await AsyncStorage.getItem(HAS_COMPLETED_ONBOARDING_KEY)
  if (!value) return
  return JSON.parse(value) as boolean
}

const setHasCompletedOnboarding = async (hasCompletedOnboarding: boolean) => {
  await AsyncStorage.setItem(HAS_COMPLETED_ONBOARDING_KEY, JSON.stringify(hasCompletedOnboarding))
}

export default {
  getHasCompletedOnboarding,
  setHasCompletedOnboarding,
}
