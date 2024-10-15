/* eslint-disable */
import { ImageSourcePropType, StyleSheet, Text, View, ScrollView, Alert, Animated, Platform } from 'react-native'
import RootStackParamList from '../../models/RootStackParamList'
import navigation, { NavigationContext } from '../../lib/navigation'
import mobilityTracking from '../../lib/mobilityTracking'
import externalLinking from '../../lib/externalLinking'
import scheduledNotifications from '../../lib/scheduledNotifications'
import { BlurView } from 'expo-blur'
import api from '../../lib/api'
import ScreenWrapper from '../ScreenWrapper'
import Button from '../reusable/BackgroundButton'
import ChatBubble from '../reusable/ChatBubble'
import { ReactNode, memo, useContext, useEffect, useRef, useState } from 'react'
import React from 'react'
import ChatBlock from './ChatBlock'
import ChatModal from './ChatModal'

interface ChatBlockProps {
  children: ReactNode
  alignment: string
}

type userProfile = {
  id: string
  name: string
  dateOfBirth: Date
  pregnancyStatus: string
  dueDate: Date
  notifications: string
  location: string
}

export default memo(OnboardingChat)

function OnboardingChat() {
  const scrollAnim = useRef(new Animated.Value(0)).current

  const [scrollDuration, setScrollDuration] = useState<number>(1000)
  const scrollViewRef = useRef<ScrollView>(null)
  const [onboardingStep, setOnboardingStep] = useState(1)
  const [isNameModalVisible, setNameModalVisible] = useState(false)
  const [isLoginModalVisible, setLoginModalVisible] = useState(false)
  const [isDateOfBirthModalVisible, setDateOfBirthModalVisible] = useState(false)
  const [isDueDateModalVisible, setDueDateModalVisible] = useState(false)
  const [loginError, setLoginError] = useState(false)

  const [userProfile, setUserProfile] = useState<userProfile>({
    id: '',
    name: '',
    dateOfBirth: new Date(),
    pregnancyStatus: '',
    dueDate: new Date(),
    notifications: 'Maybe later',
    location: 'Maybe later',
  })
  const navigationContext = useContext(NavigationContext)

  /**
   * Sends the username to the server and receives and stores an access token, if valid. Otherwise, displays an error message.
   */
  const loginUser = async (userId: string) => {
    if (isUsernameValid()) {
      try {
        const accessToken = await api.login(userId)
        await navigationContext?.signIn(accessToken)
      } catch (error) {
        Alert.alert('Error Logging In', 'Please check you have entered a valid Participant Identifier and that the trial is currently running.', [
          { text: 'Dismiss', style: 'cancel' },
        ])
        throw new Error('Login failed')
      }
    } else {
      Alert.alert('Enter Participant Identifier', 'Please enter a participant identifier to access the app.', [{ text: 'Dismiss', style: 'cancel' }])
      throw new Error('Login failed')
    }
  }

  const requestLocationPermission = async () => {
    const firstCheck = await mobilityTracking.areCorrectPermissionsGranted()
    await mobilityTracking.requestPermissionsAndStart()
  }

  const requestNotificationPermission = async () => {
    try {
      await scheduledNotifications.requestPermissionsAsync()
      await scheduledNotifications.scheduleNotification()
    } catch {
      // noop
    }
  }

  const updateProfile = (key: string, value: any) => {
    setUserProfile((prevState) => {
      return {
        ...prevState,
        [key]: value,
      }
    })
  }
  /**
   * Checks if the entered username is valid.
   *
   * @returns If the entered username is valid.
   */
  const isUsernameValid = (): boolean => {
    if (userProfile.id && userProfile.id.length === 6) {
      return true
    }
    return false
  }

  useEffect(() => {
    Animated.timing(scrollAnim, {
      toValue: 1,
      duration: scrollDuration,
      useNativeDriver: true,
    }).start()
  }, [onboardingStep])

  const formatDate = (date: Date) => {
    const options: Intl.DateTimeFormatOptions = {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    }
    return date.toLocaleDateString('en-US', options)
  }

  const handleNameModalSubmit = () => {
    setScrollDuration(1000)
    setNameModalVisible(false)
    setOnboardingStep(2)
    setTimeout(() => setOnboardingStep(3), 1000)
  }

  const handleLoginModalSubmit = () => {
    setLoginModalVisible(false)
    setOnboardingStep(4)
    setTimeout(() => setOnboardingStep(5), 1000)
    try {
      loginUser(userProfile.id.toUpperCase())
        .then(() => {
          setLoginModalVisible(false)
          setOnboardingStep(4)
          setTimeout(() => setOnboardingStep(5), 1000)
        })
        .catch((error) => {
          console.error('Login failed:', error)
        })
    } catch {
      return
    }
  }

  const handleDateOfBirth = () => {
    setScrollDuration(200)
    setDateOfBirthModalVisible(false)
    setOnboardingStep(6)
    setTimeout(() => setOnboardingStep(7), 1000)
  }

  const handleDueDate = () => {
    setScrollDuration(1800)
    setDueDateModalVisible(false)
    setOnboardingStep(10)
    setTimeout(() => setOnboardingStep(11), 1000)
  }

  return (
    <ScreenWrapper>
      <ScrollView
        style={styles.chatContainer}
        ref={scrollViewRef}
        onContentSizeChange={() => {
          scrollAnim.addListener(({ value }) => {
            scrollViewRef.current?.scrollToEnd({ animated: true })
          })
        }}
      >
        <View style={{ height: 50 }}></View>
        <Text style={styles.title}>Welcome to ParentMood</Text>
        {onboardingStep >= 1 && (
          <>
            <ChatBlock key={`chatBlock-1-left`} alignment="left">
              <ChatBubble text="Hi there! I'm Rica, your friendly virtual assistant. I'm here to help guide you through the ParentMood app!" alignment="left" />
              <ChatBubble text="What's your name?" alignment="left" />
              {onboardingStep === 1 && (
                <Button
                  onPress={() => {
                    setNameModalVisible(true)
                  }}
                  title={'Enter Name'}
                ></Button>
              )}
            </ChatBlock>
            <ChatModal
              isVisible={isNameModalVisible}
              setVisible={setNameModalVisible}
              title={'Enter your name:'}
              submitModal={(value: any) => {
                updateProfile('name', value)
                handleNameModalSubmit()
              }}
              type={'text'}
            />
          </>
        )}

        {onboardingStep >= 2 && (
          <ChatBlock key={`chatBlock-2-right`} alignment="right">
            <ChatBubble text={`${userProfile.name}`} alignment="right" />
          </ChatBlock>
        )}

        {onboardingStep >= 3 && (
          <ChatBlock key={`chatBlock-3-left`} alignment="left">
            <ChatBubble text={`Nice to meet you ${userProfile.name}. It's great to see you taking a step to look after your well-being.`} alignment="left" />
            <ChatBubble text="Parent mood is currently being trialed. If you are part of the research you can log in with your participant ID below." alignment="left" />
            {onboardingStep === 3 && <Button onPress={() => setLoginModalVisible(true)} title={'Log in with participant ID'}></Button>}
            <ChatModal
              isVisible={isLoginModalVisible}
              setVisible={setLoginModalVisible}
              title={'Enter your Participant ID:'}
              submitModal={(value: any) => {
                updateProfile('id', value.toUpperCase())
                handleLoginModalSubmit()
              }}
              type={'text'}
            />
          </ChatBlock>
        )}

        {onboardingStep >= 4 && (
          <ChatBlock key={`chatBlock-4-right`} alignment="right">
            <ChatBubble text={`${userProfile.id}`} alignment="right" />
          </ChatBlock>
        )}

        {onboardingStep >= 5 && (
          <ChatBlock key={`chatBlock-5-left`} alignment="left">
            <ChatBubble text="Brilliant, let’s build your profile." alignment="left" />
            <ChatBubble text="What year were you born?" alignment="left" />
            {onboardingStep === 5 && <Button onPress={() => setDateOfBirthModalVisible(true)} title={'Select date of birth'}></Button>}
            <ChatModal
              isVisible={isDateOfBirthModalVisible}
              setVisible={setDateOfBirthModalVisible}
              title={'Select date of birth:'}
              submitModal={(value: any) => {
                updateProfile('dateOfBirth', value)
                handleDateOfBirth()
              }}
              type={'date'}
            />
          </ChatBlock>
        )}
        {onboardingStep >= 6 && (
          <ChatBlock key={`chatBlock-6-right`} alignment="right">
            <ChatBubble text={`${formatDate(userProfile.dateOfBirth)}`} alignment="right" />
          </ChatBlock>
        )}
        {onboardingStep >= 7 && (
          <ChatBlock key={`chatBlock-7-left`} alignment="left">
            <ChatBubble text="Are you a new mum or pregnant?" alignment="left" />
            {onboardingStep === 7 && (
              <>
                <Button
                  onPress={() => {
                    setScrollDuration(200)
                    updateProfile('pregnancyStatus', 'New mum')
                    setOnboardingStep(8)
                    setTimeout(() => setOnboardingStep(11), 1000)
                  }}
                  title={'New mum'}
                ></Button>
                <Button
                  onPress={() => {
                    setScrollDuration(200)
                    updateProfile('pregnancyStatus', 'Pregnant')
                    setOnboardingStep(8)
                    setTimeout(() => setOnboardingStep(9), 1000)
                  }}
                  title={'Pregnant'}
                ></Button>
              </>
            )}
          </ChatBlock>
        )}
        {onboardingStep >= 8 && (
          <ChatBlock key={`chatBlock-8-right`} alignment="right">
            <ChatBubble text={`${userProfile.pregnancyStatus}`} alignment="right" />
          </ChatBlock>
        )}
        {onboardingStep >= 9 && (
          <ChatBlock key={`chatBlock-9-left`} alignment="left">
            <ChatBubble text={`Congratulations, ${userProfile.name}!`} alignment="left" />
            {userProfile.pregnancyStatus === 'Pregnant' && (
              <>
                <ChatBubble text="When is the due date?" alignment="left" />
                {onboardingStep === 9 && (
                  <View style={{ marginTop: 8 }}>
                    <Button onPress={() => setDueDateModalVisible(true)} title={'Select your due date'}></Button>
                  </View>
                )}
                <ChatModal
                  isVisible={isDueDateModalVisible}
                  setVisible={setDueDateModalVisible}
                  title={'Select your due date:'}
                  subtitle={'Use the date picker below to select the date'}
                  submitModal={(value: any) => {
                    updateProfile('dueDate', value)
                    handleDueDate()
                  }}
                  type={'date'}
                />
              </>
            )}
          </ChatBlock>
        )}
        {onboardingStep >= 10 && userProfile.pregnancyStatus === 'Pregnant' && (
          <ChatBlock key={`chatBlock-10-right`} alignment="right">
            <ChatBubble text={`${formatDate(userProfile.dueDate)}`} alignment="right" />
          </ChatBlock>
        )}
        {onboardingStep >= 11 && (
          <ChatBlock key={`chatBlock-11-left`} alignment="left">
            <ChatBubble text="Alright, now that we've built your profile, here's a little more information about ParentMood." alignment="left" />
            <ChatBubble
              text="ParentMood has been specially designed by researchers to help people understand their risk of experiencing low mood during and after pregnancy."
              alignment="left"
            />
            <ChatBubble text="Together, with all this information, ParentMood can estimate your risk of experiencing low mood. " alignment="left" />
            <ChatBubble text="Let me know if you're still with me by tapping the heart" alignment="left" />
            {onboardingStep === 11 && (
              <Button
                onPress={() => {
                  setOnboardingStep(12)
                  setScrollDuration(200)
                  setTimeout(() => setOnboardingStep(13), 1000)
                }}
                image={require('frontend/assets/Assets/iOS/Heart.png') as ImageSourcePropType}
                style={{ marginBottom: 60 }}
              ></Button>
            )}
          </ChatBlock>
        )}
        {onboardingStep >= 12 && (
          <ChatBlock key={`chatBlock-12-right`} alignment="right">
            <ChatBubble text="heart" alignment="right" />
          </ChatBlock>
        )}
        {onboardingStep >= 13 && (
          <ChatBlock key={`chatBlock-13-left`} alignment="left">
            <ChatBubble
              text="Great. Whilst you use ParentMood, I may send you notifications if I think you need to take action about your about your well-being. I will also send notifications to remind you to participate in games and track your mood."
              alignment="left"
            />
            {onboardingStep === 13 && (
              <>
                <Button
                  onPress={() => {
                    setScrollDuration(5200)
                    updateProfile('notifications', 'Allow')
                    setOnboardingStep(14)
                    setTimeout(() => setOnboardingStep(15), 1000)
                  }}
                  title="Allow notifications"
                ></Button>
                <Button
                  onPress={() => {
                    setScrollDuration(5200)
                    updateProfile('notifications', 'Maybe later')
                    setOnboardingStep(14)
                    setTimeout(() => setOnboardingStep(15), 1000)
                  }}
                  title="Maybe later"
                ></Button>
              </>
            )}
          </ChatBlock>
        )}
        {onboardingStep >= 14 && (
          <ChatBlock key={`chatBlock-14-right`} alignment="right">
            <ChatBubble text={`${userProfile.notifications}`} alignment="right" />
          </ChatBlock>
        )}
        {onboardingStep >= 15 && (
          <ChatBlock key={`chatBlock-15-left`} alignment="left">
            {userProfile.notifications === 'Maybe later' && <ChatBubble text="That's okay. When you're ready, you can enable notifications under settings." alignment="left" />}
            <ChatBubble text="We're almost there!" alignment="left" />
            <ChatBubble
              text="Your level of activity can impact your well-being. By assessing your location throughout the day, ParentMood will be able to estimate your activity levels."
              alignment="left"
            />
            <ChatBubble text="With this information, I can give you feedback on your level of activeness in relation to your mental well-being." alignment="left" />
            <ChatBubble
              text="Please note that this data will not be used to locate you or identify your personal information. It will only be used to measure how much and how often you move during the day. "
              alignment="left"
            />
            <ChatBubble text="Would you like to share your location with me?" alignment="left" />
            {onboardingStep === 15 && (
              <>
                <Button
                  onPress={() => {
                    setScrollDuration(1000)
                    updateProfile('location', 'Allow')
                    setOnboardingStep(16)
                    setTimeout(() => setOnboardingStep(17), 1000)
                  }}
                  title="Allow"
                ></Button>
                <Button
                  onPress={() => {
                    setScrollDuration(1000)
                    updateProfile('location', 'Maybe later')
                    setOnboardingStep(16)
                    setTimeout(() => setOnboardingStep(17), 1000)
                  }}
                  title="Maybe later"
                ></Button>
              </>
            )}
          </ChatBlock>
        )}
        {onboardingStep >= 16 && (
          <ChatBlock key={`chatBlock-16-right`} alignment="right">
            <ChatBubble text={`${userProfile.location}`} alignment="right" />
          </ChatBlock>
        )}
        {onboardingStep >= 17 && (
          <ChatBlock key={`chatBlock-17-left`} alignment="left">
            <ChatBubble
              text={
                userProfile.location
                  ? `Thank you, ${userProfile.name}. I respect your privacy and your information is safe with me.`
                  : "That's okay! When you feel comfortable, you can enable this option in the settings by tapping on your profile picture. Keep in mind that I respect your privacy and your information is safe with me."
              }
              alignment="left"
            />
            <ChatBubble
              text="And we're done! Tapping 'Go to games' will bring you to the app's home page where you can play through the games we've prepared for you!"
              alignment="left"
            />
            <Button
              onPress={() => {
                setTimeout(() => navigation.navigate('TaskSelection', {}), 1000)
              }}
              title="Go to games"
              style={{ marginBottom: 10 }}
            ></Button>
          </ChatBlock>
        )}
        <View style={{ marginTop: 60 }}></View>
      </ScrollView>
    </ScreenWrapper>
  )
}

const styles = StyleSheet.create({
  modalTextInput: {
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.9)',
    padding: 10,
    marginVertical: 20,
    borderRadius: 50,
    width: '90%',
    color: 'white',
    fontFamily: Platform.OS === 'ios' ? 'Chalkboard SE' : 'Roboto',
    fontWeight: 'bold',
    fontSize: 18,
    textAlign: 'center',
  },
  modalIcon: {
    position: 'absolute',
    backgroundColor: '#E29CDB',
    borderRadius: 60,
    borderColor: 'white',
    borderWidth: 3,
    overflow: 'hidden',
    height: 109,
    width: 109,
    transform: [{ translateY: -160 }],
  },
  chatContainer: {
    paddingHorizontal: '3%',
    marginTop: 5,
    flex: 1,
    overflow: 'hidden',
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 22,
    fontFamily: Platform.OS === 'ios' ? 'Chalkboard SE' : 'Roboto',
    color: 'white',
    alignSelf: 'center',
    marginBottom: 30,
  },
  bottomView: {
    width: '82%',
    // height:'30%',
    borderRadius: 42,
    overflow: 'hidden',
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    alignItems: 'center',
    // alignSelf: 'center',
    // position: 'absolute',
    top: '-2%',
    borderColor: 'white',
    borderWidth: 1,
    padding: 24,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 26,
    color: 'white',
    fontFamily: Platform.OS === 'ios' ? 'Chalkboard SE' : 'Roboto',
  },
})
