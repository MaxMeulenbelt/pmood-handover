import React, { Component } from 'react'
import { StyleSheet, Image, View } from 'react-native'
import BackgroundButton from '../reusable/BackgroundButton'
import Emotion from '../../models/EmotionSensitivity/Emotion'
import ImageChallengeResult from '../../models/EmotionSensitivity/ImageChallengeResult'
import EmotionSensitivityImage from '../../models/EmotionSensitivity/EmotionSensitivityImage'

type Props = {
  image: EmotionSensitivityImage
  onCompleted: (result: ImageChallengeResult) => void
}
type State = {
  emotion: Emotion | null
  initialTimestamp: Date
  emotionTimestamp: Date | null
}

/**
 * A single image challenge in the emotion sensitivity task.
 * The user is asked to select an emotion and a confidence level.
 *
 * @prop image The image for the user to rate the emotion of.
 * @prop onCompleted The function to call when the user has completed the challenge.
 */
export default class ImageChallenge extends Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = {
      emotion: null,
      initialTimestamp: new Date(),
      emotionTimestamp: null,
    }
  }

  onComplete = () => {
    if (!this.state.emotion || !this.state.emotionTimestamp) {
      return
    }

    this.props.onCompleted({
      image: this.props.image,
      emotion: this.state.emotion,
      initialTimestamp: this.state.initialTimestamp,
      emotionTimestamp: this.state.emotionTimestamp,
    })

    this.resetState()
  }

  resetState = () => {
    this.setState({
      emotion: null,
      initialTimestamp: new Date(),
      emotionTimestamp: null,
    })
  }

  render() {
    return (
      <View style={styles.container}>
        {this.props.image.prop && <Image style={styles.image} source={this.props.image.prop} />}
        <View style={styles.fixedRowContainer}>
          <View style={{ ...styles.row, ...styles.fixedRowContainer }}>
            <BackgroundButton
              style={{
                width: '40%',
                alignSelf: 'center',
              }}
              onPress={() => {
                this.setState(
                  {
                    emotion: Emotion.Sad,
                    emotionTimestamp: new Date(),
                  },
                  this.onComplete
                )
              }}
              title="Sad"
            />
            <BackgroundButton
              style={{
                width: '40%',
                alignSelf: 'center',
              }}
              onPress={() => {
                this.setState(
                  {
                    emotion: Emotion.Happy,
                    emotionTimestamp: new Date(),
                  },
                  this.onComplete
                )
              }}
              title="Happy"
            />
          </View>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    alignItems: 'center',
  },
  image: {
    marginTop: 10,
    width: 300,
    height: 300,
    borderRadius: 150,
  },
  fixedRowContainer: {
    position: 'absolute',
    display: 'flex',
    flexDirection: 'row',
    width: '100%',
    marginTop: '75%',
  },
  row: {
    marginTop: '20%',
    height: '100%',
    justifyContent: 'space-between',
  },
  emotionText: {
    fontSize: 22,
    textAlign: 'center',
  },
  confidenceTextRow: {
    margin: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
})
