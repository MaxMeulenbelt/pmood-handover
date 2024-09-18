import React, { Component } from 'react'
import { Alert, Share } from 'react-native'
import BackgroundButton from './BackgroundButton'

type Props = {
  taskName: string
  value: string
}
type State = Record<string, unknown>

/**
 * A button component that shares the user's score on a task.
 *
 * @prop taskName The in-app name of the task to be shared.
 * @prop value The user's score or result.
 */
export default class ShareButton extends Component<Props, State> {
  onShare = async () => {
    try {
      const result = await Share.share({
        url: '',
        title: '',
        message: 'I scored ' + this.props.value + ' on the ' + this.props.taskName + ' Game!',
      })
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
        } else {
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error) {
      Alert.alert('Problem With Sharing', 'Something went wrong.', [{ text: 'Dismiss', style: 'cancel' }])
    }
  }

  render() {
    return (
      <BackgroundButton
        style={{ borderRadius: 50, height: 46, width: '50%', alignSelf: 'center' }}
        title="Share Your Results"
        onPress={() => {
          this.onShare().catch((e) => void e)
        }}
      />
    )
  }
}
