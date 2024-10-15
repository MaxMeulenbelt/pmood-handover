import { useState } from 'react'
import { ImageSourcePropType, View, StyleSheet, Text, Image, Platform } from 'react-native'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import RootStackParamList from '../../models/RootStackParamList'
import { LinearGradient } from 'expo-linear-gradient'
import TaskHeader from '../reusable/TaskHeader'
import * as Progress from 'react-native-progress'
import navigation from '../../lib/navigation'
import api from '../../lib/api'
import BackgroundButton from '../reusable/BackgroundButton'
import DelayDisplay from './DelayDisplay'

type Props = NativeStackScreenProps<RootStackParamList, 'DelayDiscounting'>

export default function DelayDiscountingTask(props: Props) {
  const maxTrials = 35
  const valuesList = [200 / 2, 100 / 2, 50 / 2, 25 / 2, 12.5 / 2]

  const [stage, setStage] = useState(0)
  const [progress, setProgress] = useState(0)

  const [testNumber, setTestNumber] = useState(0)
  const [trialNumber, setTrialNumber] = useState(0)
  const [totalTrials, setTotalTrials] = useState(0)

  const [nowValue, setNowValue] = useState(200)
  const [nowCount, setNowCount] = useState(0)

  const [laterValue, setLaterValue] = useState(800)
  const [laterCount, setLaterCount] = useState(0)

  const [timeframeIdx, setTimeframeIdx] = useState(0)
  const [timeframes, setTimeframes] = useState(['In 2 weeks', 'In 1 month', 'In 6 months', 'In 1 year', 'In 3 years', 'In 10 years'])

  let content = <View></View>

  /**
   * Handles button presses from the DelayTiles in DelayDisplay
   *
   * @param response A string referring to which option the user chose in the last trial; can be 'now' or 'later'
   */
  const onPress = (response: string) => {
    setTotalTrials(totalTrials + 1)
    setProgress(progress + 1)

    if (response === 'now') {
      setNowCount(nowCount + 1)
    } else {
      setLaterCount(laterCount + 1)
    }

    const data = {
      testNumber,
      trialNumber,
      nowValue,
      laterTimeFrame: timeframes[timeframeIdx],
      userChoice: response,
    }

    api.taskAPIRequest('delay-discounting', data).catch((e) => void e)

    /**
     * Move on to next trial or navigate to results if there are no more trials left
     */
    if (totalTrials < maxTrials) {
      setTimeout(() => {
        updateNowValue(response)
        startNextTrial()
      }, 1000)
    } else {
      setTimeout(() => navToResults(), 1000)
    }
  }

  /**
   * Updates the value of now button based on which button was pressed
   * If end of current test then set values for next test, otherwise increase or decrease nowValue based on previous response
   */
  const updateNowValue = (response: string) => {
    if (trialNumber === 5) {
      setNowValue(response === 'now' ? 200 : 600)
    } else {
      setNowValue(response === 'now' ? nowValue - valuesList[trialNumber] : nowValue + valuesList[trialNumber])
    }
  }

  const startNextTrial = () => {
    setTrialNumber(trialNumber < 5 ? trialNumber + 1 : 0)

    if (trialNumber === 5) {
      setTestNumber(testNumber + 1)
      let timeframesCopy = timeframes
      setTimeframeIdx(Math.floor(Math.random() * (timeframes.length - 1)))
      timeframesCopy = timeframesCopy.filter((item) => timeframesCopy.indexOf(item) !== timeframeIdx)
      setTimeframes(timeframesCopy)
    }
  }

  const navToResults = () => {
    props.navigation.popToTop()
    navigation.navigate('DelayResults', { now: Math.round((nowCount / (nowCount + laterCount)) * 100), later: Math.round((laterCount / (nowCount + laterCount)) * 100) })
  }

  switch (stage) {
    case 0:
      content = (
        <View style={{ height: '100%', display: 'flex', alignItems: 'center' }}>
          <View style={{ height: '20%', paddingTop: '15%' }}>
            {/* eslint-disable-next-line @typescript-eslint/no-var-requires */}
            <Image style={{ transform: [{ scale: 1 }], height: 176, width: 176 }} source={require('frontend/assets/GameThumbnails/iOS/now-or-later.png') as ImageSourcePropType} />
          </View>
          <View style={{ height: '50%', display: 'flex', alignItems: 'center', width: '100%', padding: '5%' }}>
            <View style={styles.instructionContainer}>
              <Text style={styles.instructionText}>Time impacts how we make decisions about rewards.</Text>
              <Text style={styles.instructionText}>In this game, imagine someone is gifting you money. Would you rather take it now, or wait and receive more later?</Text>
              <Text style={styles.instructionText}>Ready to play?</Text>
            </View>
            <View style={styles.instructionButton}>
              <BackgroundButton
                style={{ borderRadius: 50, height: 46, width: '60%' }}
                onPress={() => {
                  setStage(stage + 1)
                  setProgress(progress + 1)
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
        <DelayDisplay
          nowValue={nowValue}
          laterValue={laterValue}
          timeframe={timeframes[timeframeIdx]}
          onPress={(choice: string) => {
            onPress(choice)
          }}
        />
      )
      break
    default:
      navToResults()
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
        title={'Now or Later'}
        iconType={stage < 1 ? 'back' : 'close'}
        backNav={() => {
          navigation.navigate('TaskSelection')
        }}
      />
      <View style={styles.taskContainer}>
        {progress > 0 && <Progress.Bar style={styles.progressBarStyle} color={'white'} progress={progress / (maxTrials + 2)} width={null} height={20} />}
        {content}
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  overlay: {
    ...StyleSheet.absoluteFillObject,
    opacity: 1,
  },
  promptContainer: {
    marginTop: '20%',
    height: '60%',
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    display: 'flex',
    paddingHorizontal: '4%',
  },
  instructionContainer: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignContent: 'center',
    marginTop: '5%',
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
  feedbackContainer: {
    margin: 16,
    marginTop: '20%',
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
