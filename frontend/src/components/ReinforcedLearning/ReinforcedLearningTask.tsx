import React, { Component } from 'react'
import { StyleSheet, View, Text, ImageSourcePropType, Image, Platform } from 'react-native'
import RLDisplay from './RLDisplay'
import RLStimulus from '../../models/ReinforcedLearning/RLStimulus'
import RLResults from '../../models/ReinforcedLearning/RLResults'
import RLData from '../../lib/RLData'
import BackgroundButton from '../reusable/BackgroundButton'
import TypingText from '../reusable/TypingText'
import * as Progress from 'react-native-progress'
import api from '../../lib/api'
import { LinearGradient } from 'expo-linear-gradient'
import TaskHeader from '../reusable/TaskHeader'
import navigation from '../../lib/navigation'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import RootStackParamList from '../../models/RootStackParamList'

type Props = NativeStackScreenProps<RootStackParamList, 'ReinforcementLearning'>
type State = {
  promptIndex: number
  promptSequence: RLStimulus[]
  stage: number
  points: number
  totalPoints: number
  progress: number
  questionTracker: number
}

export default class ReinforcedLearningFull extends Component<Props, State> {
  constructor(props: Props) {
    super(props)
    const promptSequence = RLData.shuffledPromptsForDisplay()
    this.state = {
      promptIndex: 0,
      promptSequence,
      stage: 0,
      points: 0,
      totalPoints: 0,
      progress: 1,
      questionTracker: 1,
    }
  }

  onPromptCompleted = (result: RLResults) => {
    if (result.correctChoice === 1) {
      this.setState({
        points: this.state.points + 1,
      })
    } else {
      this.setState({
        points: this.state.points - 1,
      })
    }

    // sends results to database on a per-question basis
    const data = result
    api.taskAPIRequest('probabilistic-reinforcement-learning', data).catch((e) => void e)

    this.handleNextPrompt()
  }

  handleNextPrompt = () => {
    if (this.state.promptIndex < this.state.promptSequence.length - 1) {
      this.setState({
        promptIndex: this.state.promptIndex + 1,
        progress: this.state.progress + 1,
        questionTracker: this.state.questionTracker + 1,
      })
    } else {
      this.onTaskCompleted()
    }
  }

  onTaskCompleted = () => {
    this.setState({
      totalPoints: this.state.totalPoints + this.state.points,
      promptIndex: 0,
      promptSequence: RLData.shuffledTestingPrompts(),
      progress: this.state.progress + 1,
    })

    this.setState({ stage: this.state.stage + 1 })
  }

  navToResults = () => {
    const score = this.state.totalPoints.toString()
    this.props.navigation.popToTop()
    navigation.navigate('RLResults', { score })
  }

  render() {
    let content = <View></View>

    switch (this.state.stage) {
      case 0:
        content = (
          <View style={{ height: '100%', display: 'flex', alignItems: 'center' }}>
            <View style={{ height: '20%', paddingTop: '15%' }}>
              {/* eslint-disable-next-line @typescript-eslint/no-var-requires */}
              <Image style={{ transform: [{ scale: 1.2 }] }} source={require('frontend/assets/GameThumbnails/iOS/guess.png') as ImageSourcePropType} />
            </View>
            <View style={{ height: '90%', display: 'flex', width: '100%', padding: '5%' }}>
              <View style={styles.instructionContainer}>
                <Text style={styles.instructionText}>
                  The aim of the game is to build up as many points as you can by choosing between different shapes.{'\n'}
                  {'\n'}Some shapes are more likely to earn points than others.{'\n'}
                  {'\n'}Can you figure out the pattern?
                </Text>
              </View>
              <View style={styles.instructionButton}>
                <BackgroundButton
                  style={{ borderRadius: 50, height: 46, width: '60%' }}
                  onPress={() => {
                    this.setState({
                      stage: this.state.stage + 1,
                      progress: this.state.progress + 1,
                    })
                  }}
                  title="Let's practice first!"
                />
              </View>
            </View>
          </View>
        )
        break
      case 1:
        content = (
          <View style={styles.instructionContainer}>
            <RLDisplay stim={this.state.promptSequence[this.state.promptIndex]} training={true} onCompleted={this.onPromptCompleted} qNumber={this.state.questionTracker} />
          </View>
        )
        break
      case 2:
        content = (
          <View style={{ height: '100%', display: 'flex', alignItems: 'center' }}>
            <View style={{ height: '20%', paddingTop: '25%' }}>
              {/* eslint-disable-next-line @typescript-eslint/no-var-requires */}
              <Image style={{ transform: [{ scale: 1.3 }] }} source={require('frontend/assets/GameThumbnails/iOS/read-your-mood.png') as ImageSourcePropType} />
            </View>
            <View style={{ height: '90%', display: 'flex', alignItems: 'center', width: '100%', padding: '5%' }}>
              <View style={styles.instructionContainer}>
                <Text style={styles.instructionText}>Well Done!</Text>
                <Text style={styles.instructionText}>
                  From now on, the points you get will earn or lose points based on your answers. You won't be getting any more feedback though!
                </Text>
                <Text style={styles.instructionText}>Have you figured out the pattern yet?</Text>
              </View>
              <View style={styles.instructionButton}>
                <BackgroundButton
                  style={{ borderRadius: 50, height: 46, width: '60%' }}
                  onPress={() => {
                    this.setState({
                      stage: this.state.stage + 1,
                      progress: this.state.progress + 1,
                      points: 0,
                      totalPoints: 0,
                    })
                  }}
                  title="Play"
                />
              </View>
            </View>
          </View>
        )
        break
      case 3:
        content = (
          <View style={styles.instructionContainer}>
            <RLDisplay stim={this.state.promptSequence[this.state.promptIndex]} training={false} onCompleted={this.onPromptCompleted} qNumber={this.state.questionTracker} />
          </View>
        )
        break
      case 4:
        content = (
          <View style={{ height: '100%', display: 'flex', alignItems: 'center' }}>
            <View style={{ height: '9%', marginTop: '15%' }}>
              <Text style={styles.title}>Well Done!</Text>
            </View>
            <View style={styles.blurContainer}>
              <View style={styles.blur}>
                <Text style={[styles.smallText, { marginBottom: '3%' }]}>Score</Text>
                <View style={styles.resultsContainer}>
                  <Text style={styles.largeText}>{this.state.totalPoints}</Text>
                  <Text style={styles.smallText}>points</Text>
                </View>
              </View>
              <Text style={styles.instructionText}>
                You're 1/4 of the way through!{'\n'}
                {'\n'}Are you ready?
              </Text>
            </View>
            <View style={styles.instructionButton}>
              <BackgroundButton
                style={{ borderRadius: 50, height: 46, width: '60%' }}
                onPress={() => {
                  this.setState({
                    stage: this.state.stage + 1,
                    progress: this.state.progress + 1,
                    points: 0,
                  })
                }}
                title="Continue"
              />
            </View>
          </View>
        )
        break
      case 5:
        content = (
          <View style={styles.instructionContainer}>
            <RLDisplay stim={this.state.promptSequence[this.state.promptIndex]} training={false} onCompleted={this.onPromptCompleted} qNumber={this.state.questionTracker} />
          </View>
        )
        break
      case 6:
        content = (
          <View style={{ height: '100%', display: 'flex', alignItems: 'center' }}>
            <View style={{ height: '9%', marginTop: '15%' }}>
              <Text style={styles.title}>Well Done!</Text>
            </View>
            <View style={styles.blurContainer}>
              <View style={styles.blur}>
                <Text style={[styles.smallText, { marginBottom: '3%' }]}>Score</Text>
                <View style={styles.resultsContainer}>
                  <Text style={styles.largeText}>{this.state.totalPoints}</Text>
                  <Text style={styles.smallText}>points</Text>
                </View>
              </View>
              <Text style={styles.instructionText}>
                You're 1/2 of the way through!{'\n'}
                {'\n'}Have you found the pattern yet?
              </Text>
            </View>
            <View style={styles.instructionButton}>
              <BackgroundButton
                style={{ borderRadius: 50, height: 46, width: '60%' }}
                onPress={() => {
                  this.setState({
                    stage: this.state.stage + 1,
                    progress: this.state.progress + 1,
                    points: 0,
                  })
                }}
                title="Continue"
              />
            </View>
          </View>
        )
        break
      case 7:
        content = (
          <View style={styles.instructionContainer}>
            <RLDisplay stim={this.state.promptSequence[this.state.promptIndex]} training={false} onCompleted={this.onPromptCompleted} qNumber={this.state.questionTracker} />
          </View>
        )
        break
      case 8:
        content = (
          <View style={{ height: '100%', display: 'flex', alignItems: 'center' }}>
            <View style={{ height: '9%', marginTop: '15%' }}>
              <Text style={styles.title}>Well Done!</Text>
            </View>
            <View style={styles.blurContainer}>
              <View style={styles.blur}>
                <Text style={[styles.smallText, { marginBottom: '3%' }]}>Score</Text>
                <View style={styles.resultsContainer}>
                  <Text style={styles.largeText}>{this.state.totalPoints}</Text>
                  <Text style={styles.smallText}>points</Text>
                </View>
              </View>
              <Text style={styles.instructionText}>
                You're 3/4 of the way through!{'\n'}
                {'\n'}This is the final stretch.
              </Text>
            </View>
            <View style={styles.instructionButton}>
              <BackgroundButton
                style={{ borderRadius: 50, height: 46, width: '60%' }}
                onPress={() => {
                  this.setState({
                    stage: this.state.stage + 1,
                    progress: this.state.progress + 1,
                    points: 0,
                  })
                }}
                title="Continue"
              />
            </View>
          </View>
        )
        break
      case 9:
        content = (
          <View style={styles.instructionContainer}>
            <RLDisplay stim={this.state.promptSequence[this.state.promptIndex]} training={false} onCompleted={this.onPromptCompleted} qNumber={this.state.questionTracker} />
          </View>
        )
        break
      case 10:
        setTimeout(() => {
          this.navToResults()
        }, 1000)
        break
    }

    return (
      <View style={{ flex: 1 }}>
        <LinearGradient
          colors={['#CC94E0', '#E097D8', '#F6C19E', '#FDCBB4']}
          locations={[0, 0.45, 0.75, 1]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.overlay}
        ></LinearGradient>
        <TaskHeader
          title={'Patterns and Points'}
          iconType={this.state.stage < 1 ? 'back' : 'close'}
          backNav={() => {
            navigation.navigate('TaskSelection', {})
          }}
        />
        <View style={styles.taskContainer}>
          {this.state.progress > 0 && <Progress.Bar style={styles.progressBarStyle} color={'white'} progress={this.state.progress / 156} width={null} height={20} />}
          {content}
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  overlay: {
    ...StyleSheet.absoluteFillObject,
    opacity: 1,
  },
  blurContainer: {
    display: 'flex',
    height: '60%',
    width: '100%',
    paddingHorizontal: '5%',
  },
  blur: {
    borderRadius: 42,
    overflow: 'hidden',
    backgroundColor: 'rgba(97,97,97, 0.22)',
    width: '100%',
    height: '35%',
    borderColor: 'white',
    borderWidth: 1,
    display: 'flex',
    padding: '6%',
    justifyContent: 'center',
  },
  largeText: {
    fontSize: 54,
    color: 'white',
    marginTop: '-10%',
  },
  resultsContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    height: '65%',
    display: 'flex',
  },
  smallText: {
    fontSize: 16,
    color: 'white',
    height: '30%',
    width: '100%',
    textAlign: 'center',
  },
  unitText: {
    fontSize: 24,
    color: 'white',
    textAlign: 'center',
    marginTop: '-2%',
  },
  title: {
    fontSize: 32,
    fontFamily: Platform.OS === 'ios' ? 'Chalkboard SE' : 'Roboto',
    color: 'white',
    fontWeight: 'bold',
  },
  instructionContainer: {
    width: '100%',
    height: '60%',
    marginTop: '5%',
  },
  instructionButton: {
    width: '100%',
    height: '15%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: '-10%',
  },
  instructionText: {
    fontSize: 18,
    textAlign: 'center',
    color: '#fff',
    fontFamily: Platform.OS === 'ios' ? 'Chalkboard SE' : 'Roboto',
    marginTop: '10%',
  },
  instructionTextBold: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: '10%',
  },
  instructionTextGreen: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: '10%',
    color: '#00c907',
  },
  taskContainer: {
    display: 'flex',
    height: '100%',
  },
  promptContainer: {
    textAlign: 'center',
  },
  feedbackContainer: {
    margin: 16,
    marginTop: '20%',
    height: '80%',
  },
  textPointsGained: {
    fontSize: 18,
    textAlign: 'center',
    marginBottom: '10%',
    color: '#00c907',
  },
  textPointsLost: {
    fontSize: 18,
    textAlign: 'center',
    marginBottom: '10%',
    color: '#f50000',
  },
  progressBarStyle: {
    textAlign: 'center',
    marginHorizontal: '12%',
    marginTop: '5%',
    width: '76%',
    borderRadius: 50,
    position: 'absolute',
  },
  progressBarPromptStyle: {
    textAlign: 'center',
    marginHorizontal: '5%',
    marginTop: '10%',
  },
})
