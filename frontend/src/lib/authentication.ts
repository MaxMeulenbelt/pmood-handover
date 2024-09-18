import * as SecureStore from 'expo-secure-store'

const API_ACCESS_TOKEN_KEY = 'API_ACCESS_TOKEN'

const getAccessToken = async () => {
  return await SecureStore.getItemAsync(API_ACCESS_TOKEN_KEY)
}

const setAccessToken = async (accessToken: string) => {
  await SecureStore.setItemAsync(API_ACCESS_TOKEN_KEY, accessToken)
}

const removeAccessToken = async () => {
  await SecureStore.deleteItemAsync(API_ACCESS_TOKEN_KEY)
}

export default {
  getAccessToken,
  setAccessToken,
  removeAccessToken,
}
