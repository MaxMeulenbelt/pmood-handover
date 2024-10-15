import React, { useReducer, useEffect, useMemo } from 'react'
import { Button, Platform, PlatformColor, TouchableOpacity } from 'react-native'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { Ionicons } from '@expo/vector-icons'
import * as Notifications from 'expo-notifications'
import Onboarding from './src/components/Onboarding/Onboarding'
import SplashScreen from './src/components/Authentication/SplashScreen'
import SignIn from './src/components/Authentication/SignIn'
import TaskSelection from './src/components/TaskSelection/TaskSelection'
import EmotionSensitivityTask from './src/components/EmotionSensitivity/EmotionSensitivityTask'
import RootStackParamList from './src/models/RootStackParamList'
import ReinforcedLearningTask from './src/components/ReinforcedLearning/ReinforcedLearningTask'
import SlotMachine from './src/components/SlotMachine/MainSlotScreen'
import EffortExpenditureTask from './src/components/EffortExpenditure/EffortExpenditureTask'
import MemoryRecallTask from './src/components/MemoryRecall/MemoryRecallTask'
import PanasTask from './src/components/Panas/PanasTask'
import Settings from './src/components/Settings/Settings'
import Licenses from './src/components/Settings/Licenses'
import NavigationContextActions from './src/models/NavigationContextActions'
import navigation, { NavigationContext, navigationRef } from './src/lib/navigation'
import authentication from './src/lib/authentication'
import onboarding from './src/lib/onboarding'
import mobilityTracking from './src/lib/mobilityTracking'
import scheduledNotifications from './src/lib/scheduledNotifications'
import userPreferences from './src/lib/userPreferences'
import Profile from './src/components/Profile'
import EmoSensResults from './src/components/EmotionSensitivity/EmoSensResults'
import RLResults from './src/components/ReinforcedLearning/RLResults'
import DelayDiscountingTask from './src/components/DelayDiscounting/DelayDiscountingTask'
import DelayResults from './src/components/DelayDiscounting/DelayResults'
import EffortResults from './src/components/EffortExpenditure/EffortResults'
import MemoryResults from './src/components/MemoryRecall/MemoryResults'
import OnboardingChat from './src/components/Onboarding/OnboardingChat'
import PDDQuiz from './src/components/PDDQuiz/PDDQuiz'

const Stack = createNativeStackNavigator<RootStackParamList>()

type State = {
  isLoading: boolean
  isSignOut: boolean
  userToken: string | null
  hasCompletedOnboarding: boolean
  notificationPermissionGranted: boolean
}
type Action = {
  token: string | null
  type: 'RESTORE_TOKEN' | 'SIGN_IN' | 'SIGN_OUT' | 'COMPLETED_ONBOARDING'
}

const reducer = (prevState: State, action: Action): State => {
  switch (action.type) {
    case 'RESTORE_TOKEN':
      return {
        ...prevState,
        userToken: action.token,
        isLoading: false,
      }
    case 'SIGN_IN':
      return {
        ...prevState,
        isSignOut: false,
        userToken: action.token,
      }
    case 'SIGN_OUT':
      return {
        ...prevState,
        isSignOut: true,
        userToken: null,
      }
    case 'COMPLETED_ONBOARDING':
      return {
        ...prevState,
        hasCompletedOnboarding: true,
      }
  }
}

export default function App() {
  const [state, dispatch] = useReducer(reducer, {
    isLoading: true,
    isSignOut: false,
    userToken: null,
    hasCompletedOnboarding: false,
    notificationPermissionGranted: false,
  })

  // const [fontsLoaded] = useFonts({
  //   'Chalkboard SE custom custom': require('./assets/fonts/CHALKBOARDS.TTF'),
  // })

  // Schedule notifications
  useEffect(() => {
    const permissionRequest = async () => {
      try {
        await scheduledNotifications.scheduleNotification()
      } catch {
        // noop
      }
    }
    permissionRequest().catch((e) => void e)
  }, [])

  useEffect(() => {
    const subscription = Notifications.addNotificationResponseReceivedListener(() => {
      // Push PanasTask onto stack here
      navigation.navigate('PanasTask', {})
    })
    return () => subscription.remove()
  }, [])

  useEffect(() => {
    // Fetch the token from storage then navigate to our appropriate place
    const bootstrapAsync = async () => {
      try {
        const userToken = await authentication.getAccessToken()
        dispatch({ type: 'RESTORE_TOKEN', token: userToken })
      } catch (error) {
        dispatch({ type: 'RESTORE_TOKEN', token: null })
      }
    }

    bootstrapAsync().catch((e) => void e)
  }, [])

  useEffect(() => {
    // Only re-request permission/restart location tracking if onboarding has been completed i.e. on future app launches
    const mobilityTrackingAsync = async () => {
      try {
        const isMobilityTrackingEnabled = await userPreferences.getIsMobilityTrackingEnabled()
        if (state.hasCompletedOnboarding && isMobilityTrackingEnabled) {
          await mobilityTracking.requestPermissionsAndStart()
        }
      } catch {
        // noop
      }
    }

    mobilityTrackingAsync().catch((e) => void e)
  })

  const navigationContext = useMemo<NavigationContextActions | null>(
    () => ({
      signIn: async (accessToken: string) => {
        await authentication.setAccessToken(accessToken)
        dispatch({ type: 'SIGN_IN', token: accessToken })
      },
      signOut: async () => {
        await authentication.removeAccessToken()
        dispatch({ type: 'SIGN_OUT', token: null })
      },
      completedOnboarding: async () => {
        await onboarding.setHasCompletedOnboarding(true)
        dispatch({ type: 'COMPLETED_ONBOARDING', token: null })
      },
    }),
    []
  )

  return (
    // <NavigationContext.Provider value={navigationContext}>
    //   <NavigationContainer ref={navigationRef}>
    //     {state.isLoading ? (
    //       // We haven't finished checking for the token yet
    //       <Stack.Navigator
    //         initialRouteName="SplashScreen"
    //         screenOptions={{
    //           headerShown: false,
    //         }}
    //       >
    //         <Stack.Screen name="SplashScreen" component={SplashScreen} options={{ headerShown: false }} />
    //       </Stack.Navigator>
    //     ) : state.userToken == null ? (
    //       // No token found, user isn't signed in
    //       <Stack.Navigator
    //         initialRouteName="SignIn"
    //         screenOptions={{
    //           headerShown: false,
    //         }}
    //       >
    //         {/* {!state.hasCompletedOnboarding && <Stack.Screen name="Onboarding" component={Onboarding} options={{ headerShown: false }} />} */}
    //         {!state.hasCompletedOnboarding && <Stack.Screen name="OnboardingChat" component={OnboardingChat} />}

    //         <Stack.Screen name="SignIn" component={SignIn} options={{ title: 'Sign In', animationTypeForReplace: state.isSignOut ? 'pop' : 'push' }} />
    //       </Stack.Navigator>
    //     ) : (
    //       // User is signed in
    //       <Stack.Navigator
    //         initialRouteName="TaskSelection"
    //         screenOptions={{
    //           headerShown: false,
    //         }}
    //       >
    //         <Stack.Screen name="OnboardingChat" component={OnboardingChat} />
    //         <Stack.Screen
    //           name="TaskSelection"
    //           component={TaskSelection}
    //           options={{
    //             title: 'Tasks',
    //             headerRight: () => (
    //               <TouchableOpacity onPress={() => navigation.navigate('Settings', {})}>
    //                 <Ionicons name="settings-sharp" size={24} color={Platform.OS === 'ios' ? PlatformColor('link') : 'blue'} />
    //               </TouchableOpacity>
    //             ),
    //           }}
    //         />
    //         <Stack.Screen name="EmotionSensitivity" component={EmotionSensitivityTask} options={{ title: 'Happy or Sad?' }} />
    //         <Stack.Screen name="EmoSensResults" component={EmoSensResults} options={{ title: 'Results' }} initialParams={{ accuracy: 0, arTime: 0 }} />
    //         <Stack.Screen name="MemoryRecall" component={MemoryRecallTask} options={{ title: 'Memory Recall' }} />
    //         <Stack.Screen name="MemoryResults" component={MemoryResults} options={{ title: 'Results' }} initialParams={{ recalledWords: 0 }} />
    //         <Stack.Screen name="PanasTask" component={PanasTask} options={{ title: 'Read Your Mood' }} />
    //         <Stack.Screen name="ReinforcementLearning" component={ReinforcedLearningTask} options={{ title: 'Patterns and Points' }} />
    //         <Stack.Screen name="RLResults" component={RLResults} options={{ title: 'Results' }} />
    //         <Stack.Screen name="DelayDiscounting" component={DelayDiscountingTask} options={{ title: 'Now or Later' }} />
    //         <Stack.Screen name="DelayResults" component={DelayResults} options={{ title: 'Results' }} initialParams={{ now: 50, later: 50 }} />
    //         <Stack.Screen name="SlotMachine" component={SlotMachine} options={{ title: 'Slot Machine' }} />
    //         <Stack.Screen name="EffortExpenditure" component={EffortExpenditureTask} options={{ title: 'Fill the Bar' }} />
    //         <Stack.Screen name="EffortResults" component={EffortResults} options={{ title: 'Results' }} initialParams={{ successRate: 0, hardRate: 60, score: 12 }} />
    //         <Stack.Screen name="Profile" component={Profile} options={{ title: 'Profile' }} />
    //         <Stack.Screen
    //           name="Settings"
    //           component={Settings}
    //           options={{
    //             title: 'Settings',
    //             presentation: 'modal',
    //             headerRight: () => <Button onPress={() => navigation.navigate('TaskSelection', {})} title="Done" />,
    //           }}
    //         />
    //         <Stack.Screen
    //           name="Licenses"
    //           component={Licenses}
    //           options={{
    //             title: 'Licenses',
    //             presentation: 'modal',
    //             headerRight: () => <Button onPress={() => navigation.navigate('Settings', {})} title="Done" />,
    //           }}
    //         />
    //         <Stack.Screen name="PDDQuiz" component={PDDQuiz} options={{ title: 'PDDQuiz' }} />
    //       </Stack.Navigator>
    //     )}
    //   </NavigationContainer>
    // </NavigationContext.Provider>

    <NavigationContext.Provider value={navigationContext}>
      <NavigationContainer ref={navigationRef}>
        <Stack.Navigator
          initialRouteName="TaskSelection"
          screenOptions={{
            headerShown: false,
          }}
        >
          <Stack.Screen name="OnboardingChat" component={OnboardingChat} />
          <Stack.Screen
            name="TaskSelection"
            component={TaskSelection}
            options={{
              title: 'Tasks',
              headerRight: () => (
                <TouchableOpacity onPress={() => navigation.navigate('Settings', {})}>
                  <Ionicons name="settings-sharp" size={24} color={Platform.OS === 'ios' ? PlatformColor('link') : 'blue'} />
                </TouchableOpacity>
              ),
            }}
          />
          <Stack.Screen name="EmotionSensitivity" component={EmotionSensitivityTask} options={{ title: 'Happy or Sad?' }} />
          <Stack.Screen name="EmoSensResults" component={EmoSensResults} options={{ title: 'Results' }} initialParams={{ accuracy: 0, arTime: 0 }} />
          <Stack.Screen name="MemoryRecall" component={MemoryRecallTask} options={{ title: 'Memory Recall' }} />
          <Stack.Screen name="MemoryResults" component={MemoryResults} options={{ title: 'Results' }} initialParams={{ recalledWords: 0 }} />
          <Stack.Screen name="PanasTask" component={PanasTask} options={{ title: 'Read Your Mood' }} />
          <Stack.Screen name="ReinforcementLearning" component={ReinforcedLearningTask} options={{ title: 'Patterns and Points' }} />
          <Stack.Screen name="RLResults" component={RLResults} options={{ title: 'Results' }} />
          <Stack.Screen name="DelayDiscounting" component={DelayDiscountingTask} options={{ title: 'Now or Later' }} />
          <Stack.Screen name="DelayResults" component={DelayResults} options={{ title: 'Results' }} initialParams={{ now: 50, later: 50 }} />
          <Stack.Screen name="SlotMachine" component={SlotMachine} options={{ title: 'Slot Machine' }} />
          <Stack.Screen name="EffortExpenditure" component={EffortExpenditureTask} options={{ title: 'Fill the Bar' }} />
          <Stack.Screen name="EffortResults" component={EffortResults} options={{ title: 'Results' }} initialParams={{ successRate: 0, hardRate: 60, score: 12 }} />
          <Stack.Screen name="Profile" component={Profile} options={{ title: 'Profile' }} />
          <Stack.Screen
            name="Settings"
            component={Settings}
            options={{
              title: 'Settings',
              presentation: 'modal',
              headerRight: () => <Button onPress={() => navigation.navigate('TaskSelection', {})} title="Done" />,
            }}
          />
          <Stack.Screen
            name="Licenses"
            component={Licenses}
            options={{
              title: 'Licenses',
              presentation: 'modal',
              headerRight: () => <Button onPress={() => navigation.navigate('Settings', {})} title="Done" />,
            }}
          />
          <Stack.Screen name="PDDQuiz" component={PDDQuiz} options={{ title: 'PDDQuiz' }} />
        </Stack.Navigator>
      </NavigationContainer>
    </NavigationContext.Provider>
  )
}
