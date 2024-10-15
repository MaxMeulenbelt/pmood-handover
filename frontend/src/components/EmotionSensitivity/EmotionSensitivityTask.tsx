import React, { Component } from 'react'
import { ImageSourcePropType, StyleSheet, Text, View, Image, Platform } from 'react-native'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import RootStackParamList from '../../models/RootStackParamList'
import ImageChallenge from './ImageChallenge'
import BackgroundButton from '../reusable/BackgroundButton'
import EmotionSensitivityImage from '../../models/EmotionSensitivity/EmotionSensitivityImage'
import ImageChallengeResult from '../../models/EmotionSensitivity/ImageChallengeResult'
import EmotionSensitivityScore from '../../models/EmotionSensitivity/EmotionSensitivityScore'
import emotionSensitivity from '../../lib/emotionSensitivity'
import emotionSensitivityScore from '../../lib/emotionSensitivityScore'
import api from '../../lib/api'
import TaskHeader from '../reusable/TaskHeader'
import { LinearGradient } from 'expo-linear-gradient'
import navigation from '../../lib/navigation'
import * as Progress from 'react-native-progress'

type Props = NativeStackScreenProps<RootStackParamList, 'EmotionSensitivity'>
type State = {
  imageIndex: number
  imageSequence: EmotionSensitivityImage[]
  results: ImageChallengeResult[]
  stage: number
  score?: EmotionSensitivityScore
  progress: number
}

/**
 * The emotion sensitivity task.
 * The user is shown some instructions prompts, and then series of images and asked to rate the emotion of each.
 *
 * @prop navigation The navigation object.
 */
export default class EmotionSensitivityTask extends Component<Props, State> {
  /**
   * The duration in ms that the fixation point is displayed between challenges.
   */
  static fixationPointDuration = 0

  constructor(props: Props) {
    super(props)
    const imageSequence = emotionSensitivity.shuffledImagesForDisplay()
    this.state = {
      imageIndex: 0,
      imageSequence,
      results: [],
      stage: 0,
      progress: 0,
    }
  }
  onImageChallengeCompleted = (result: ImageChallengeResult) => {
    this.setState(
      {
        results: [...this.state.results, result],
        progress: (this.state.imageIndex + 1) / this.state.imageSequence.length,
      },
      this.handleNextChallenge
    )
  }

  handleNextChallenge = () => {
    if (this.state.imageIndex < this.state.imageSequence.length - 1) {
      this.setState({
        imageIndex: this.state.imageIndex + 1,
      })
    } else {
      setTimeout(() => this.onTaskCompleted(), 500)
    }
  }

  onTaskCompleted = () => {
    const data = {
      hitRate: emotionSensitivityScore.calculateHitRate(this.state.results),
      falseAlarmRate: emotionSensitivityScore.calculateFalseAlarmRate(this.state.results),
      missCount: emotionSensitivityScore.getResponseMisses(this.state.results).length,
    }

    // Stop data being sent to the server for the practice trials
    if (data.hitRate || data.falseAlarmRate || data.missCount) {
      api.taskAPIRequest('emotion-sensitivity', data).catch((e) => void e)
    }
    setTimeout(() => {
      this.setState({
        score: emotionSensitivityScore.calculateEmotionSensitivity(this.state.results),
      })
      this.navToResults()
    }, 0)
  }

  navToResults = () => {
    const score = Math.round((this.state.score?.score || 0.0) * 100).toString()
    const averageResponseTime = ((this.state.score?.averageResponseTime || 0.0) / 1000).toFixed(1).toString()
    this.props.navigation.popToTop()
    navigation.navigate('EmoSensResults', { accuracy: score, arTime: averageResponseTime })
  }

  render() {
    let content = <View></View>

    switch (this.state.stage) {
      case 0:
        content = (
          <View style={{ height: '100%', display: 'flex', alignItems: 'center' }}>
            <View style={{ height: '20%', paddingTop: '15%' }}>
              {/* eslint-disable-next-line @typescript-eslint/no-var-requires */}
              <Image style={{ transform: [{ scale: 1.5 }] }} source={require('frontend/assets/GameThumbnails/iOS/hbaby-sbaby.png') as ImageSourcePropType} />
            </View>
            <View style={{ height: '80%', display: 'flex', alignItems: 'center', width: '100%' }}>
              <View style={styles.instructionContainer}>
                <Text style={styles.instructionText}>
                  You will see pictures of babies showing emotions. You need to choose if the baby is SAD, or HAPPY, and as quickly as possible.
                </Text>
                <Text style={styles.instructionText}>Remember, some emotions are not very clear. Please make your best guess as quickly as you can.</Text>
                <Text style={styles.instructionText}>Are you Ready?</Text>
              </View>
              <View style={styles.instructionButton}>
                <BackgroundButton
                  style={{ borderRadius: 50, height: 46, width: '60%' }}
                  onPress={() => {
                    this.setState({
                      stage: 1,
                    })
                  }}
                  title="Play"
                />
              </View>
            </View>
          </View>
        )
        break
      case 1:
        content = (
          <View style={{ width: '100%', height: '100%', alignItems: 'center', marginTop: '20%' }}>
            <View style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <View>
                <ImageChallenge image={this.state.imageSequence[this.state.imageIndex]} onCompleted={this.onImageChallengeCompleted} />
              </View>
            </View>
            <View style={styles.progressContainer}>
              <Progress.Circle
                progress={this.state.progress}
                size={320}
                thickness={10}
                strokeCap={'round'}
                color={'#F6C19E'}
                unfilledColor={'rgba(0, 0, 0, 0.1)'}
                borderWidth={0}
                fill={'rgba(203,141,206,0.2)'}
              />
            </View>
          </View>
        )
        break
    }

    return (
      <View style={styles.container}>
        <LinearGradient
          colors={['#CC94E0', '#E097D8', '#F6C19E', '#FDCBB4']}
          locations={[0, 0.45, 0.75, 1]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.overlay}
        ></LinearGradient>
        <TaskHeader
          title={'Happy or Sad?'}
          iconType={this.state.stage > 0 ? 'close' : 'back'}
          backNav={() => {
            navigation.navigate('TaskSelection', {})
          }}
        />
        {content}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  progressContainer: {
    position: 'absolute',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    opacity: 1,
  },
  taskTitle: {
    fontSize: 32,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 16,
    color: '#fff',
    fontFamily: Platform.OS === 'ios' ? 'Chalkboard SE' : 'Roboto',
  },
  instructionContainer: {
    paddingHorizontal: 32,
    paddingTop: '5%',
    width: '100%',
    height: '62%',
    justifyContent: 'center',
    alignContent: 'center',
  },
  instructionButton: {
    marginBottom: 0,
    width: '100%',
    height: '25%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  instructionText: {
    fontSize: 18,
    textAlign: 'center',
    marginBottom: 32,
    color: '#fff',
    fontFamily: Platform.OS === 'ios' ? 'Chalkboard SE' : 'Roboto',
  },
  fixationPoint: {
    fontSize: 28,
    color: '#fff',
  },
})
