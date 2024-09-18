import React, { Component } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import RLStimulus from '../../models/ReinforcedLearning/RLStimulus'
import RLResults from '../../models/ReinforcedLearning/RLResults'
import StimTile from './StimTile'
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons'

type Props = {
  stim: RLStimulus
  training: boolean
  onCompleted: (result: RLResults) => void
  qNumber: number
}
type State = {
  response: string | null
  initialTime: Date
  responseTime: Date | null
  stage: number
  random: number
  correct: number
  trainingCorrect: string
}

export default class RLDisplay extends Component<Props, State> {
  feedbackLength: number
  constructor(props: Props) {
    super(props)
    const random = Math.random()
    this.feedbackLength = 1000
    this.state = {
      response: null,
      initialTime: new Date(),
      responseTime: null,
      stage: 0,
      random,
      correct: 0,
      trainingCorrect: '',
    }
  }

  onComplete = () => {
    if (!this.state.response || !this.state.responseTime) {
      return
    }

    this.props.onCompleted({
      questionNumber: this.props.qNumber,
      leftImageName: this.props.stim.name1,
      leftImageProbability: this.props.stim.value1,
      rightImageName: this.props.stim.name2,
      rightImageProbability: this.props.stim.value2,
      userResponse: this.state.response,
      initialTimestamp: this.state.initialTime,
      responseTimestamp: this.state.responseTime,
      correctChoice: this.state.correct,
    })

    this.resetState()
  }

  /*
   *  If the left image is selected.
   *  If not in training, will add a point for choosing the response with a higher probability of winning.
   */
  feedbackA = () => {
    if (!this.props.training) {
      this.feedbackLength = 500
      if (this.props.stim.value1 > this.props.stim.value2) {
        this.setState({
          correct: 1,
          stage: this.state.stage + 1,
        })
      } else {
        this.setState({
          correct: 0,
          stage: this.state.stage + 1,
        })
      }
      this.feedbackTime()
      return
    }

    // answer was correct during training
    if (this.state.random <= this.props.stim.value1) {
      this.setState({
        stage: this.state.stage + 1,
        trainingCorrect: 'left',
      })
    } else {
      this.setState({
        stage: this.state.stage + 2,
        trainingCorrect: 'right',
      })
    }

    this.feedbackTime()
  }

  /*
   *  If the right image is selected.
   *  If not in training, will add a point for choosing the response with a higher probability of winning.
   */
  feedbackB = () => {
    if (!this.props.training) {
      this.feedbackLength = 500
      if (this.props.stim.value1 < this.props.stim.value2) {
        this.setState({
          correct: 1,
          stage: this.state.stage + 1,
        })
      } else {
        this.setState({
          correct: 0,
          stage: this.state.stage + 1,
        })
      }
      this.feedbackTime()
      return
    }

    // answer was correct during training
    if (this.state.random <= this.props.stim.value2) {
      this.setState({
        stage: this.state.stage + 1,
        trainingCorrect: 'right',
      })
    } else {
      this.setState({
        stage: this.state.stage + 2,
        trainingCorrect: 'left',
      })
    }

    this.feedbackTime()
  }

  /*
   *  Displays feedback for set length of time
   */
  feedbackTime = () => {
    const fTime = setTimeout(() => {
      this.onComplete()
      clearTimeout(fTime)
    }, this.feedbackLength)
  }

  resetState = () => {
    this.setState({
      response: null,
      initialTime: new Date(),
      responseTime: null,
      stage: 0,
      random: Math.random(),
      trainingCorrect: '',
    })
  }

  render() {
    let content = <View></View>

    switch (this.state.stage) {
      case 0:
        content = (
          <View style={styles.promptContainer}>
            <StimTile
              symbol={this.props.stim.prop1}
              selected={false}
              disabled={false}
              training={this.props.training}
              onPress={() =>
                this.setState(
                  {
                    response: this.props.stim.name1,
                    responseTime: new Date(),
                  },
                  this.feedbackA
                )
              }
            />
            <StimTile
              symbol={this.props.stim.prop2}
              selected={false}
              disabled={false}
              training={this.props.training}
              onPress={() =>
                this.setState(
                  {
                    response: this.props.stim.name2,
                    responseTime: new Date(),
                  },
                  this.feedbackB
                )
              }
            />
          </View>
        )
        break
      case 1:
        content = (
          <View style={styles.promptContainer}>
            <StimTile
              symbol={this.props.stim.prop1}
              selected={this.state.response === this.props.stim.name1}
              disabled={true}
              training={this.props.training}
              correct={this.state.trainingCorrect === 'left'}
              onPress={() =>
                this.setState(
                  {
                    response: this.props.stim.name1,
                    responseTime: new Date(),
                  },
                  this.feedbackA
                )
              }
            />
            <StimTile
              symbol={this.props.stim.prop2}
              selected={this.state.response === this.props.stim.name2}
              disabled={true}
              training={this.props.training}
              correct={this.state.trainingCorrect === 'right'}
              onPress={() =>
                this.setState(
                  {
                    response: this.props.stim.name2,
                    responseTime: new Date(),
                  },
                  this.feedbackB
                )
              }
            />
          </View>
        )
        break
      case 2:
        content = (
          <View style={styles.promptContainer}>
            <StimTile
              symbol={this.props.stim.prop1}
              selected={this.state.response === this.props.stim.name1}
              disabled={true}
              training={this.props.training}
              correct={this.state.trainingCorrect === 'left'}
              onPress={() =>
                this.setState(
                  {
                    response: this.props.stim.name1,
                    responseTime: new Date(),
                  },
                  this.feedbackA
                )
              }
            />
            <StimTile
              symbol={this.props.stim.prop2}
              selected={this.state.response === this.props.stim.name2}
              disabled={true}
              training={this.props.training}
              correct={this.state.trainingCorrect === 'right'}
              onPress={() =>
                this.setState(
                  {
                    response: this.props.stim.name2,
                    responseTime: new Date(),
                  },
                  this.feedbackB
                )
              }
            />
          </View>
        )
        break
    }

    return <View style={{ display: 'flex', width: '100%', height: '100%' }}>{content}</View>
  }
}

const styles = StyleSheet.create({
  promptContainer: {
    marginTop: '15%',
    height: '100%',
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    display: 'flex',
    paddingHorizontal: '4%',
  },
  responseContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  instructionTextBold: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: '10%',
    marginHorizontal: '10%',
  },
  feedbackContainer: {
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: '100%',
    borderWidth: 1,
    borderColor: 'white',
  },
  textCorrect: {
    fontSize: 35,
    fontWeight: 'bold',
    textAlign: 'center',
    marginHorizontal: '10%',
    color: '#00c907',
  },
  textIncorrect: {
    fontSize: 35,
    fontWeight: 'bold',
    textAlign: 'center',
    marginHorizontal: '10%',
    color: '#f50000',
  },
  fixationContainer: {
    marginTop: '52%',
    marginHorizontal: '9%',
    textAlign: 'center',
  },
})
