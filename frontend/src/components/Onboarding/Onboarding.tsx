import React, { Component, ContextType, createRef, useContext, useEffect, useState } from 'react'
import { Alert, Image, Animated, ImageSourcePropType, StyleSheet, Text, View, ImageBackground, Pressable, TextInput, KeyboardAvoidingView, Platform } from 'react-native'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { MaterialIcons } from '@expo/vector-icons'
import PagerView from 'react-native-pager-view'
import { PRIVACY_POLICY_URI } from '@env'
import BackgroundButton from '../reusable/BackgroundButton'
import RootStackParamList from '../../models/RootStackParamList'
import { NavigationContext } from '../../lib/navigation'
import mobilityTracking from '../../lib/mobilityTracking'
import externalLinking from '../../lib/externalLinking'
import scheduledNotifications from '../../lib/scheduledNotifications'
import { LinearGradient } from 'expo-linear-gradient'
import { BlurView } from 'expo-blur'
import { IconButton } from '@react-native-material/core'
import api from '../../lib/api'

type Props = NativeStackScreenProps<RootStackParamList, 'Onboarding'>
type State = Record<string, unknown>

type BottomProps = {
  title: string
  description: string
  icon: ImageSourcePropType
}

const AnimatedPagerView = Animated.createAnimatedComponent(PagerView)

const BottomView = () => {
  return (
    <View>
      <Text>Temp</Text>
    </View>
  )
}

export default function Onboarding(props: Props) {
  const [page, setPage] = useState(0)
  const [username, setUsername] = useState('')
  const context = useContext(NavigationContext)

  const [isSignedIn, setIsSignedIn] = useState(false)

  // check if user is signed in
  // if yes - skip signin page and go directly to page=2
  // no - start at 0
  // useEffect(()=>{

  // })

  const isUsernameValid = () => {
    if (username) {
      return true
    }
    // TODO - link with db .. this is temporary
    return true
    return false
  }

  /**
   * Sends the username to the server and receives and stores an access token, if valid. Otherwise, displays an error message.
   */
  const loginUser = async () => {
    if (isUsernameValid()) {
      try {
        const accessToken = await api.login(username.toUpperCase())
        await context?.signIn(accessToken)
      } catch (error) {
        Alert.alert('Error Logging In', 'Please check you have entered a valid Participant Identifier and that the trial is currently running.', [
          { text: 'Dismiss', style: 'cancel' },
        ])
      }
    } else {
      Alert.alert('Enter Participant Identifier', 'Please enter a participant identifier to access the app.', [{ text: 'Dismiss', style: 'cancel' }])
    }
  }

  let content = <View></View>
  if (page === 0) {
    content = (
      <View style={{ height: '100%' }}>
        <View style={[styles.iconContainer, { height: '50%' }]}>
          <Image
            // eslint-disable-next-line @typescript-eslint/no-var-requires
            source={require('frontend/assets/Assets/iOS/welcome.png') as ImageSourcePropType}
            style={{ transform: [{ scale: 1 }] }}
          />
          <Text style={[styles.title, { fontSize: 18 }]}>ParentMood</Text>
        </View>
        {/* <View style={{ position: 'absolute', width: '100%', paddingLeft: 24, height: '20%', justifyContent: 'center' }}>
          <IconButton
            icon={() => <MaterialIcons name="keyboard-backspace" size={46} color="white" />}
            onPress={() => {
              setPage(page - 1)
            }}
          />
        </View> */}
        <BlurView style={styles.bottomView} intensity={20}>
          <View>
            <Text style={styles.title}>Empowering You</Text>
          </View>
          <View style={styles.descriptionBox}>
            <Text style={styles.description}>
              Let our app be your guide as you cultivate strength, embrace support, and nurture your well-being on this transformative journey.
            </Text>
            <Pressable
              onPress={() => {
                setPage(page + 1)
              }}
            >
              <Image
                // eslint-disable-next-line @typescript-eslint/no-var-requires
                source={require('frontend/assets/Assets/iOS/Heart.png') as ImageSourcePropType}
                style={{ marginVertical: 32 }}
              />
            </Pressable>
          </View>
          <View
            style={{
              marginBottom: '40%',
              borderRadius: 50,
              height: 46,
              width: '90%',
              backgroundColor: 'rgba(59, 59, 59, .2)',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <Text style={{ fontFamily: Platform.OS === 'ios' ? 'Chalkboard SE' : 'Arial', fontSize: 13, color: 'white' }}>Tap the heart if you are ready</Text>
          </View>
        </BlurView>
      </View>
    )
  }
  if (page === 1) {
    content = (
      <View style={{ height: '100%' }}>
        <View style={styles.iconContainer}>
          <Image
            // eslint-disable-next-line @typescript-eslint/no-var-requires
            source={require('frontend/assets/Assets/iOS/Heart.png') as ImageSourcePropType}
            style={{ transform: [{ scale: 0.4 }] }}
          />
          <Image
            // eslint-disable-next-line @typescript-eslint/no-var-requires
            source={require('frontend/assets/Assets/iOS/Heart.png') as ImageSourcePropType}
            style={{ opacity: 0.2, transform: [{ scale: 1.2 }, { translateY: -66 }] }}
          />
        </View>
        <View style={{ position: 'absolute', width: '100%', paddingLeft: 24, height: '20%', justifyContent: 'center' }}>
          <IconButton
            icon={() => <MaterialIcons name="keyboard-backspace" size={46} color="white" />}
            onPress={() => {
              setPage(page - 1)
            }}
          />
        </View>
        <BlurView style={[styles.bottomView, { height: '80%', paddingBottom: '110%' }]} intensity={20}>
          <KeyboardAvoidingView behavior="padding" style={{ width: '100%', flex: 1 }}>
            <View style={{ alignItems: 'center', height: '70%', width: '100%' }}>
              <Text style={styles.title}>Sign up</Text>
              <View style={styles.descriptionBox}>
                <Text style={styles.description}>Enter your participant identifier</Text>
              </View>
              <TextInput
                placeholder="E.g. AB1234"
                value={username}
                autoCapitalize="characters"
                autoCorrect={false}
                returnKeyType="done"
                style={styles.identifierInput}
                onChangeText={(text) => setUsername(text.toUpperCase())}
              />
            </View>
            <BackgroundButton
              onPress={() => {
                setPage(page + 1)
                // loginUser().catch((e) => void e)
              }}
              style={{ marginBottom: '40%', borderRadius: 50, height: 46, width: '90%', alignSelf: 'center' }}
              title={'Sign in'}
            ></BackgroundButton>
          </KeyboardAvoidingView>
        </BlurView>
      </View>
    )
  }

  if (page === 2) {
    content = (
      <View style={{ height: '100%' }}>
        <View style={styles.iconContainer}>
          <Image
            // eslint-disable-next-line @typescript-eslint/no-var-requires
            source={require('frontend/assets/Assets/iOS/Heart.png') as ImageSourcePropType}
            style={{ transform: [{ scale: 0.6 }] }}
          />
          <Image
            // eslint-disable-next-line @typescript-eslint/no-var-requires
            source={require('frontend/assets/Assets/iOS/Heart.png') as ImageSourcePropType}
            style={{ opacity: 0.2, transform: [{ scale: 1.2 }, { translateY: -66 }] }}
          />
        </View>
        <View style={{ position: 'absolute', width: '100%', paddingLeft: 24, height: '20%', justifyContent: 'center' }}>
          <IconButton
            icon={() => <MaterialIcons name="keyboard-backspace" size={46} color="white" />}
            onPress={() => {
              setPage(page - 1)
            }}
          />
        </View>
        <BlurView style={styles.bottomView} intensity={20}>
          <View style={{ alignItems: 'center', height: '70%' }}>
            <Text style={styles.title}>Welcome</Text>
            <Image
              // eslint-disable-next-line @typescript-eslint/no-var-requires
              source={require('frontend/assets/Reusable/iOS/welcome.png') as ImageSourcePropType}
              style={{ opacity: 1 }}
            />
            <View style={styles.descriptionBox}>
              <Text style={styles.description}>
                Here you’ll find a collection of engaging and uplifting games. By completing these games, we can work together to better understand your well-being.
              </Text>
            </View>
          </View>
          <BackgroundButton
            onPress={() => {
              setPage(page + 1)
            }}
            style={{ marginBottom: '40%', borderRadius: 50, height: 46, width: '90%' }}
            title={'Okay'}
          ></BackgroundButton>
        </BlurView>
      </View>
    )
  }
  if (page === 3) {
    content = (
      <View style={{ height: '100%' }}>
        <View style={styles.iconContainer}>
          <Image
            // eslint-disable-next-line @typescript-eslint/no-var-requires
            source={require('frontend/assets/Assets/iOS/Heart.png') as ImageSourcePropType}
            style={{ transform: [{ scale: 0.8 }] }}
          />
          <Image
            // eslint-disable-next-line @typescript-eslint/no-var-requires
            source={require('frontend/assets/Assets/iOS/Heart.png') as ImageSourcePropType}
            style={{ opacity: 0.2, transform: [{ scale: 1.2 }, { translateY: -66 }] }}
          />
        </View>
        <View style={{ position: 'absolute', width: '100%', paddingLeft: 24, height: '20%', justifyContent: 'center' }}>
          <IconButton
            icon={() => <MaterialIcons name="keyboard-backspace" size={46} color="white" />}
            onPress={() => {
              setPage(page - 1)
            }}
          />
        </View>
        <BlurView style={styles.bottomView} intensity={20}>
          <View style={{ alignItems: 'center', height: '70%' }}>
            <Text style={styles.title}>Notification Permission</Text>
            <Image
              // eslint-disable-next-line @typescript-eslint/no-var-requires
              source={require('frontend/assets/Assets/iOS/location.png') as ImageSourcePropType}
              style={{ opacity: 1 }}
            />
            <View style={styles.descriptionBox}>
              <Text style={styles.description}>Notification text</Text>
            </View>
          </View>
          <BackgroundButton
            onPress={() => {
              setPage(page + 1)
            }}
            style={{ marginBottom: '40%', borderRadius: 50, height: 46, width: '90%' }}
            title={'Allow'}
          ></BackgroundButton>
          {/* <View style={{ width: '100%', justifyContent: 'center', alignItems: 'center' }}>
          </View> */}
        </BlurView>
      </View>
    )
  }
  if (page === 4) {
    content = (
      <View style={{ height: '100%' }}>
        <View style={styles.iconContainer}>
          <Image
            // eslint-disable-next-line @typescript-eslint/no-var-requires
            source={require('frontend/assets/Assets/iOS/Heart.png') as ImageSourcePropType}
            style={{ transform: [{ scale: 0.9 }] }}
          />
          <Image
            // eslint-disable-next-line @typescript-eslint/no-var-requires
            source={require('frontend/assets/Assets/iOS/Heart.png') as ImageSourcePropType}
            style={{ opacity: 0.2, transform: [{ scale: 1.2 }, { translateY: -66 }] }}
          />
        </View>
        <View
          style={{
            display: 'flex',
            position: 'absolute',
            width: '100%',
            paddingHorizontal: 24,
            height: '20%',
            justifyContent: 'space-between',
            flexDirection: 'row',
            marginTop: '15%',
          }}
        >
          <IconButton
            icon={() => <MaterialIcons name="keyboard-backspace" size={46} color="white" />}
            onPress={() => {
              setPage(page - 2)
            }}
          />
          <Pressable
            onPress={() => {
              setPage(0)
            }}
          >
            <Text style={{ color: '#1F1F1F', fontFamily: Platform.OS === 'ios' ? 'Chalkboard SE' : 'Arial' }}>Later</Text>
          </Pressable>
        </View>
        <BlurView style={styles.bottomView} intensity={20}>
          <View style={{ alignItems: 'center', height: '70%' }}>
            <Text style={styles.title}>Location Permission</Text>
            <Image
              // eslint-disable-next-line @typescript-eslint/no-var-requires
              source={require('frontend/assets/Assets/iOS/location.png') as ImageSourcePropType}
              style={{ opacity: 1 }}
            />
            <View style={styles.descriptionBox}>
              <Text style={styles.description}>
                To better understand your well-being and predict post-natal depression, we may request access to your device’s location. Please know that we value your privacy and
                will never use your data for any other purpose.
              </Text>
            </View>
          </View>
          <BackgroundButton
            onPress={() => {
              setPage(0)
              // props.navigation.replace('SignIn')
              // context?.completedOnboarding().catch((e) => void e)
            }}
            style={{ marginBottom: '40%', borderRadius: 50, height: 46, width: '90%' }}
            title={'Allow'}
          ></BackgroundButton>
          {/* <View style={{ width: '100%', justifyContent: 'center', alignItems: 'center' }}>
          </View> */}
        </BlurView>
      </View>
    )
  }

  return (
    <View>
      <LinearGradient
        colors={['#CC94E0', '#E097D8', '#F6C19E', '#FDCBB4']}
        locations={[0, 0.45, 0.75, 1]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.overlay}
      ></LinearGradient>
      <ImageBackground
        // eslint-disable-next-line @typescript-eslint/no-var-requires
        source={require('frontend/assets/Assets/iOS/background.png') as ImageSourcePropType}
        imageStyle={{ opacity: 0.55 }}
      >
        <View style={{ height: '100%', width: '100%' }}>{content}</View>
      </ImageBackground>
    </View>
  )
}

/**
 * A series of prompts to guide the user through the onboarding process.
 *
 * @prop navigation The navigation object.
 */
// export class Onboarding extends Component<Props, State> {
//   static contextType = NavigationContext
//   declare context: ContextType<typeof NavigationContext>
//   pagerRef: React.RefObject<PagerView>

//   constructor(props: Props) {
//     super(props)
//     this.pagerRef = createRef()
//   }

//   requestLocationPermission = async () => {
//     const firstCheck = await mobilityTracking.areCorrectPermissionsGranted()
//     if (firstCheck) {
//       this.finishFirstLocationScreen()
//       return
//     }

//     this.finishFirstLocationScreen()
//     return
//     await mobilityTracking.requestPermissionsAndStart()

//     const secondCheck = await mobilityTracking.areCorrectPermissionsGranted()
//     if (secondCheck) this.finishFirstLocationScreen()
//   }

//   requestNotificationPermission = async () => {
//     try {
//       await scheduledNotifications.requestPermissionsAsync()
//       await scheduledNotifications.scheduleNotification()
//       this.pagerRef.current?.setPage(5)
//     } catch {
//       // noop
//     }
//   }

//   finishFirstLocationScreen = () => {
//     if (Platform.OS === 'ios') {
//       this.pagerRef.current?.setPage(3)
//     } else {
//       this.pagerRef.current?.setPage(4)
//     }
//   }
//   render() {
//     let content = <View></View>

//     switch (this.state.stage) {

//       <View>
//         <LinearGradient
//           colors={['#CC94E0', '#E097D8', '#F6C19E', '#FDCBB4']}
//           locations={[0, 0.45, 0.75, 1]}
//           start={{ x: 0, y: 0 }}
//           end={{ x: 1, y: 1 }}
//           style={styles.overlay}
//         ></LinearGradient>
//         <ImageBackground
//           // eslint-disable-next-line @typescript-eslint/no-var-requires
//           source={require('frontend/assets/Assets/iOS/background.png') as ImageSourcePropType}
//           imageStyle={{ opacity: 0.55 }}
//         >
//             <View style={styles.page} key="1">
//               <Text style={styles.title}>Welcome</Text>
//               <View style={styles.focalContent}>
//                 <MaterialCommunityIcons name="hand-clap" size={120} style={styles.image} color="black" />
//                 <Text style={styles.text}>Click below to learn a bit more about the app.</Text>
//               </View>
//               <BackgroundButton
//                 title="Next"
//                 style={styles.button}
//                 onPress={() => {
//                   this.pagerRef.current?.setPage(1)
//                 }}
//               />
//             </View>
//             <View style={styles.page} key="2">
//               <Text style={styles.title}>Completing Games</Text>
//               <View style={styles.focalContent}>
//                 <FontAwesome5 name="tasks" size={96} style={styles.image} color="black" />
//                 <Text style={styles.text}>
//                   This app requires you to complete a series of small games, which in turn can be used to help predict post-natal depression. Please try and complete them often, or
//                   when we send you a notification.
//                 </Text>
//               </View>
//               <BackgroundButton
//                 title="Next"
//                 style={styles.button}
//                 onPress={() => {
//                   this.pagerRef.current?.setPage(2)
//                 }}
//               />
//             </View>
//             <View style={styles.page} key="3">
//               <Text style={styles.title}>Location Permission</Text>
//               <View style={styles.focalContent}>
//                 <FontAwesome5 name="location-arrow" size={96} style={styles.image} color="black" />
//                 <Text style={styles.text}>
//                   We use your device location as an indicator of your mobility to help predict post-natal depression. We will never store your data for any other purposes.
//                   {Platform.OS === 'ios'
//                     ? " Please grant this app the 'Always Allow' permission to access your 'Precise' location."
//                     : " Please grant this app the 'Allow all the time' permission to access your 'Precise' location."}
//                 </Text>
//               </View>
//               <BackgroundButton
//                 title="Continue With Location Permissions"
//                 style={styles.button}
//                 onPress={() => {
//                   this.requestLocationPermission().catch((e) => void e)
//                 }}
//               />
//             </View>
//             <View style={styles.page} key="4">
//               <Text style={styles.title}>Background Location</Text>
//               <View style={styles.focalContent}>
//                 <FontAwesome name="map-signs" size={96} style={styles.image} color="black" />
//                 <Text style={styles.text}>
//                   Please open Settings to allow this app to receive your location in the background. This is required to understand your mobility when not using the app. Your phone
//                   may occasionally remind you that we use your location. Do not be alarmed by this and please do not revoke this access.
//                 </Text>
//                 <BackgroundButton
//                   title="Open Settings"
//                   style={styles.miniButton}
//                   onPress={() => {
//                     externalLinking.openAppSettings().catch((e) => void e)
//                   }}
//                 />
//               </View>
//               <BackgroundButton
//                 title="Continue"
//                 style={styles.button}
//                 onPress={() => {
//                   this.pagerRef.current?.setPage(4)
//                 }}
//               />
//             </View>
//             <View style={styles.page} key="5">
//               <Text style={styles.title}>Notifications</Text>
//               <View style={styles.focalContent}>
//                 <Ionicons name="notifications" size={96} style={styles.image} color="black" />
//                 <Text style={styles.text}>We use notifications to remind you to complete particular games at certain times of the day.</Text>
//               </View>
//               <BackgroundButton
//                 title="Continue with Notification Permissions"
//                 style={styles.button}
//                 onPress={() => {
//                   this.requestNotificationPermission().catch((e) => void e)
//                 }}
//               />
//             </View>
//             <View style={styles.page} key="6">
//               <Text style={styles.title}>Data Collection</Text>
//               <View style={styles.focalContent}>
//                 <FontAwesome name="database" size={96} style={styles.image} color="black" />
//                 <Text style={styles.text}>
//                   Data will be collected for the purposes of this academic research trial. This data will be stored securely and will not be used for any other purposes. You can
//                   find out more information in the participant information sheet below.
//                 </Text>
//                 <BackgroundButton
//                   title="View Participant Information Sheet"
//                   style={styles.miniButton}
//                   onPress={() => {
//                     Linking.openURL(PRIVACY_POLICY_URI).catch((e) => void e)
//                   }}
//                 />
//               </View>
//               <BackgroundButton
//                 title="I Agree"
//                 style={styles.button}
//                 onPress={() => {
//                   this.pagerRef.current?.setPage(6)
//                 }}
//               />
//             </View>
//             <View style={styles.page} key="7">
//               <Text style={styles.title}>Accessing The Trial</Text>
//               <View style={styles.focalContent}>
//                 <FontAwesome5 name="clipboard-list" size={112} style={styles.image} color="black" />
//                 <Text style={styles.text}>
//                   You are accessing this app as part of an academic trial, so you will be asked to enter your participant identifier to continue. You will only need to do this
//                   once.
//                 </Text>
//               </View>
//               <BackgroundButton
//                 title="Continue"
//                 style={styles.button}
//                 onPress={() => {
//                   this.props.navigation.replace('SignIn')
//                   this.context?.completedOnboarding().catch((e) => void e)
//                 }}
//               />
//             </View>
//         </ImageBackground>
//       </View>
//     )
//   }
// }

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 16,
    marginTop: 12,
    color: 'white',
    fontFamily: Platform.OS === 'ios' ? 'Chalkboard SE' : 'Arial',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    opacity: 1,
    flex: 1,
  },
  bottomView: {
    width: '82%',
    height: '70%',
    borderRadius: 42,
    overflow: 'hidden',
    flex: 1,
    backgroundColor: 'rgba(151, 151, 151, 0.2)',
    alignItems: 'center',
    alignSelf: 'center',
    position: 'absolute',
    bottom: '-10%',
    borderColor: 'white',
    borderWidth: 1,
    padding: 24,
  },
  description: {
    color: 'white',
    fontSize: 16,
    textAlign: 'center',
    fontFamily: Platform.OS === 'ios' ? 'Chalkboard SE' : 'Arial',
  },
  descriptionBox: {
    flex: 1,
    marginTop: 16,
    maxHeight: '50%',
    alignItems: 'center',
  },
  iconContainer: {
    position: 'absolute',
    width: '100%',
    alignItems: 'center',
    height: '40%',
    justifyContent: 'center',
    marginTop: 20,
  },
  identifierInput: {
    fontSize: 18,
    fontFamily: Platform.OS === 'ios' ? 'Chalkboard SE' : 'Arial',
    color: 'white',
    textAlign: 'center',
    height: 46,
    width: '90%',
    overflow: 'hidden',
    marginBottom: '10%',
    borderRadius: 50,
    backgroundColor: 'rgba(59, 59, 59, .2)',
    borderColor: 'rgba(256, 256, 256, .7)',
    borderWidth: 1,
  },
})
