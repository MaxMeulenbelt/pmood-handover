import React, { Component, ContextType } from 'react'
import { Platform, PlatformColor, SafeAreaView, StyleSheet, Switch, Text, TouchableOpacity, View } from 'react-native'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import BackgroundButton from '../reusable/BackgroundButton'
import RootStackParamList from '../../models/RootStackParamList'
import { NavigationContext } from '../../lib/navigation'
import mobilityTracking from '../../lib/mobilityTracking'
import userPreferences from '../../lib/userPreferences'

type Props = NativeStackScreenProps<RootStackParamList, 'Settings'>
type State = {
  isMobilityTrackingEnabled?: boolean
}

/**
 * A settings page for the user to configure app preferences and view app information.
 *
 * @prop navigation The navigation object.
 */
export default class Settings extends Component<Props, State> {
  static contextType = NavigationContext
  declare context: ContextType<typeof NavigationContext>

  constructor(props: Props) {
    super(props)
    this.state = {
      isMobilityTrackingEnabled: undefined,
    }
  }

  async componentDidMount() {
    try {
      this.setState({
        isMobilityTrackingEnabled: await userPreferences.getIsMobilityTrackingEnabled(),
      })
    } catch {
      // noop
    }
  }

  toggleMobilityTracking = async () => {
    try {
      const isEnabled = !this.state.isMobilityTrackingEnabled
      await userPreferences.setIsMobilityTrackingEnabled(isEnabled)

      if (isEnabled) {
        await mobilityTracking.requestPermissionsAndStart()
      } else {
        await mobilityTracking.stop()
      }

      this.setState({
        isMobilityTrackingEnabled: isEnabled,
      })
    } catch (e) {
      // noop
    }
  }

  render() {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.page}>
          <View>
            {this.state.isMobilityTrackingEnabled !== undefined && (
              <View>
                <View style={styles.settingsRow}>
                  <Text style={styles.settingsLabel}>Enable Mobility Tracking</Text>
                  <Switch onValueChange={this.toggleMobilityTracking} value={this.state.isMobilityTrackingEnabled} />
                </View>
                <Text style={styles.caption}>Use your device location as an indicator of your mobility. This may have a negative affect on device battery life.</Text>
              </View>
            )}
            <TouchableOpacity onPress={() => this.props.navigation.navigate('Licenses')}>
              <Text style={styles.link}>View licenses and acknowledgments</Text>
            </TouchableOpacity>
          </View>
          <BackgroundButton
            title="Log Out"
            onPress={() => {
              this.context?.signOut().catch((e) => void e)
            }}
          />
        </View>
      </SafeAreaView>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  settingsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  settingsLabel: {
    flex: 1,
    fontSize: 18,
  },
  caption: {
    marginTop: 8,
    color: 'gray',
    fontSize: 13,
  },
  page: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
  },
  link: {
    textAlign: 'center',
    margin: 8,
    ...Platform.select({
      ios: {
        color: PlatformColor('link'),
      },
      android: {
        color: 'blue',
      },
      default: {
        color: 'blue',
      },
    }),
  },
})
