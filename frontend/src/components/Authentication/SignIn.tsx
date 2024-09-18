import React, { Component, ContextType } from 'react'
import { Alert, ImageBackground, ImageSourcePropType, StyleSheet, Text, TextInput, View } from 'react-native'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import RootStackParamList from '../../models/RootStackParamList'
import BackgroundButton from '../reusable/BackgroundButton'
import { NavigationContext } from '../../lib/navigation'
import api from '../../lib/api'
import { LinearGradient } from 'expo-linear-gradient'

type Props = NativeStackScreenProps<RootStackParamList, 'SignIn'>
type State = {
  username: string
}

/**
 * The sign in screen for the user.
 *
 * @prop navigation The navigation object.
 */
export default class SignIn extends Component<Props, State> {
  static contextType = NavigationContext
  declare context: ContextType<typeof NavigationContext>

  constructor(props: Props) {
    super(props)
    this.state = {
      username: '',
    }
  }

  /**
   * Checks if the entered username is valid.
   *
   * @returns If the entered username is valid.
   */
  isUsernameValid = (): boolean => {
    if (this.state.username) {
      return true
    }
    // TODO - link with db .. this is temporary
    return true
    return false
  }

  /**
   * Sends the username to the server and receives and stores an access token, if valid. Otherwise, displays an error message.
   */
  loginUser = async () => {
    if (this.isUsernameValid()) {
      try {
        const accessToken = await api.login(this.state.username.toUpperCase())
        await this.context?.signIn(accessToken)
      } catch (error) {
        Alert.alert('Error Logging In', 'Please check you have entered a valid Participant Identifier and that the trial is currently running.', [
          { text: 'Dismiss', style: 'cancel' },
        ])
      }
    } else {
      Alert.alert('Enter Participant Identifier', 'Please enter a participant identifier to access the app.', [{ text: 'Dismiss', style: 'cancel' }])
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <LinearGradient
          colors={['#CC94E0', '#E097D8', '#F6C19E', '#FDCBB4']}
          locations={[0, 0.45, 0.75, 1]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.overlay}
        ></LinearGradient>
        <ImageBackground
          // eslint-disable-next-line @typescript-eslint/no-var-requires
          source={require('frontend/assets/Reusable/iOS/background.png') as ImageSourcePropType}
          imageStyle={{ opacity: 0.55 }}
        >
          <Text style={styles.title}>Enter Your Participant Identifier</Text>
          <TextInput
            placeholder="AB1234"
            value={this.state.username}
            autoCapitalize="characters"
            autoCorrect={false}
            returnKeyType="done"
            style={styles.identifierInput}
            onChangeText={(text) =>
              this.setState({
                username: text.toUpperCase(),
              })
            }
          />
          <BackgroundButton
            title="Sign In"
            onPress={() => {
              this.loginUser().catch((e) => void e)
            }}
          />
        </ImageBackground>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
  },
  identifierInput: {
    fontSize: 34,
    margin: 16,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    opacity: 1,
  },
})
