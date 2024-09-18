import { createContext } from 'react'
import { createNavigationContainerRef } from '@react-navigation/native'
import NavigationContextActions from '../models/NavigationContextActions'
import RootStackParamList from '../models/RootStackParamList'

export const NavigationContext = createContext<NavigationContextActions | null>(null)

export const navigationRef = createNavigationContainerRef()

function navigate(name: keyof RootStackParamList, params: object = {}) {
  if (navigationRef.isReady()) {
    navigationRef.navigate(name, params)
  }
}

export default {
  navigate,
}
