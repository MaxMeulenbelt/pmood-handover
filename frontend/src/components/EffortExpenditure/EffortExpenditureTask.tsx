import { useEffect, useReducer, useState } from 'react'
import { View, StyleSheet, Text, ImageSourcePropType, Image, Pressable, Platform } from 'react-native'
import navigation from '../../lib/navigation'
import RootStackParamList from '../../models/RootStackParamList'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import EffortBar from './EffortBar'
import { LinearGradient } from 'expo-linear-gradient'
import TaskHeader from '../reusable/TaskHeader'
import BackgroundButton from '../reusable/BackgroundButton'
import api from '../../lib/api'

type Props = NativeStackScreenProps<RootStackParamList, 'EffortExpenditure'>
export default function EffortExpenditureTask(props: Props) {
  const taskDuration = 300 * 1000
  const winProbList = [0.88, 0.5, 0.12]
  const hardPointsList = [1, 2, 3, 4]

  const [timerRunning, setTimerRunning] = useState(true)
  const [stage, setStage] = useState(0)
  const [difficulty, setDifficulty] = useState('')
  const [winProbIdx, setWinProbIdx] = useState(0)
  const [score, setScore] = useState(0)
  const [winCount, setWinCount] = useState(0)
  const [hardPointsIdx, setHardPointsIdx] = useState(0)
  const [hardCount, setHardCount] = useState(0)
  const [currentTaskNumber, setCurrentTaskNumber] = useState(0)

  useEffect(() => {
    if (timerRunning) {
      return
    }
    navToResults()
  }, [timerRunning])

  const navToResults = () => {
    const hardRate = Math.floor((hardCount / currentTaskNumber) * 100)
    const successRate = Math.floor((winCount / currentTaskNumber) * 100)
    props.navigation.popToTop()
    navigation.navigate('EffortResults', { hardRate, successRate, score })
  }

  /**
   * Updates relevant states to move to next trial and sends trial by trial data to database
   *
   * @param didComplete boolean - did user fill the progress bar to the top
   * @param didWin boolean - did user win
   */
  const onComplete = (didComplete: boolean, didWin: boolean) => {
    if (difficulty === 'hard') {
      setHardCount(hardCount + 1)
    }

    if (didWin) {
      setScore(difficulty === 'hard' ? score + hardPointsList[hardPointsIdx] : score + 1)
      setWinCount(winCount + 1)
    }

    const data = {
      trialNumber: currentTaskNumber,
      winProbability: winProbList[winProbIdx],
      userChoice: difficulty,
      hardTaskPoints: hardPointsList[hardPointsIdx],
      taskCompleted: didComplete,
      pointsWon: didWin,
    }

    api.taskAPIRequest('effort-expenditure', data).catch((e) => void e)

    setCurrentTaskNumber(currentTaskNumber + 1)
    setHardPointsIdx(Math.floor(Math.random() * 4))
    setWinProbIdx(Math.floor(Math.random() * 3))
    setDifficulty('')
  }

  let content = <View></View>

  switch (stage) {
    case 0:
      content = (
        <View style={{ height: '100%', display: 'flex', alignItems: 'center' }}>
          <View style={{ height: '20%', paddingTop: '5%' }}>
            {/* eslint-disable-next-line @typescript-eslint/no-var-requires */}
            <Image style={{ height: 176, width: 176 }} source={require('frontend/assets/GameThumbnails/iOS/button-pressing.png') as ImageSourcePropType} />
          </View>
          <View style={styles.textContainer}>
            <View style={styles.instructionContainer}>
              <Text style={styles.instructionText}>
                Let's see how many points you can earn by tapping the screen!{'\n'}
                {'\n'}
                This game is about effort and reward. How much effort are you willing to put in to get something you want?{'\n'}
                {'\n'}
                This task will last 5 minutes. Your goal is to fill the bar before your time runs out.
              </Text>
            </View>
          </View>
          <View style={styles.instructionButton}>
            <BackgroundButton
              style={{ borderRadius: 50, height: 46, width: '60%' }}
              onPress={() => {
                setStage(stage + 1)
              }}
              title="Continue"
            />
          </View>
        </View>
      )
      break
    case 1:
      content = (
        <View style={{ height: '100%', display: 'flex', alignItems: 'center' }}>
          <View style={{ height: '20%', paddingTop: '5%' }}>
            {/* eslint-disable-next-line @typescript-eslint/no-var-requires */}
            <Image style={{ height: 176, width: 176 }} source={require('frontend/assets/GameThumbnails/iOS/button-pressing.png') as ImageSourcePropType} />
          </View>
          <View style={styles.textContainer}>
            <View style={styles.instructionContainer}>
              <Text style={styles.instructionText}>
                Each round has a probability of winning points: low (12%), medium (50%) or high (88%).{'\n'}
                {'\n'}
                In each round you can choose to do an easy or hard task. Succeeding in the easy task will score 1 point, succeeding in the hard task will win up to 4 points.{'\n'}
                {'\n'}
                Are you ready to win some points?
              </Text>
            </View>
          </View>
          <View style={styles.instructionButton}>
            <BackgroundButton
              style={{ borderRadius: 50, height: 46, width: '60%' }}
              onPress={() => {
                setStage(stage + 1)
                setTimeout(() => setTimerRunning(false), taskDuration)
              }}
              title="Continue"
            />
          </View>
        </View>
      )
      break
    case 2:
      content = (
        <View style={{ display: 'flex', justifyContent: 'center' }}>
          <Text style={{ textAlign: 'center', color: 'white', fontSize: 24, fontWeight: 'bold', marginBottom: '20%' }}>What choice will you make?</Text>
          <Text style={{ textAlign: 'center', color: 'white', fontSize: 24, marginBottom: '5%' }}>Probability of win {winProbList[winProbIdx] * 100}%</Text>
          <View style={styles.tileContainer}>
            <Pressable
              style={[styles.difficultyTile, { backgroundColor: difficulty === 'hard' ? 'rgba(151, 151, 151, 0.2)' : 'rgba(225,220,220,0.2)' }]}
              onPress={() => {
                setDifficulty('hard')
                setStage(stage + 1)
              }}
            >
              <View>
                <Text style={{ fontSize: 24, color: 'white', textAlign: 'center' }}>Hard</Text>
                <Text style={{ fontSize: 32, color: 'white', textAlign: 'center', fontWeight: 'bold' }}>{hardPointsList[hardPointsIdx]}</Text>
                <Text style={{ fontSize: 16, color: 'white', textAlign: 'center' }}>{hardPointsList[hardPointsIdx] > 1 ? 'points' : 'point'}</Text>
              </View>
            </Pressable>
            <Pressable
              style={[styles.difficultyTile, { backgroundColor: difficulty === 'easy' ? 'rgba(151, 151, 151, 0.2)' : 'rgba(225,220,220,0.2)' }]}
              onPress={() => {
                setDifficulty('easy')
                setStage(stage + 1)
              }}
            >
              <View>
                <Text style={{ fontSize: 24, color: 'white', textAlign: 'center' }}>Easy</Text>
                <Text style={{ fontSize: 32, color: 'white', textAlign: 'center', fontWeight: 'bold' }}>1</Text>
                <Text style={{ fontSize: 16, color: 'white', textAlign: 'center' }}>point</Text>
              </View>
            </Pressable>
          </View>
        </View>
      )
      break
    case 3:
      content = (
        <View>
          <EffortBar
            difficulty={difficulty}
            winProb={winProbList[winProbIdx]}
            onComplete={(didComplete: boolean, didWin: boolean) => {
              if (didComplete && didWin) {
                onComplete(true, true)
                setStage(stage + 1)
              } else if (didComplete && !didWin) {
                onComplete(true, false)
                setStage(stage + 2)
              } else if (!didComplete && !didWin) {
                onComplete(false, false)
                setStage(stage + 2)
              }
            }}
          />
        </View>
      )
      break
    case 4:
      content = (
        <View style={{ height: '100%', display: 'flex', alignItems: 'center' }}>
          <View style={{ height: '9%' }}>
            <Text style={styles.title}>Well Done!</Text>
          </View>
          <View style={styles.blurContainer}>
            <View style={styles.blur}>
              <Text style={[styles.smallText, { marginBottom: '3%' }]}>Score</Text>
              <View style={styles.resultsContainer}>
                <Text style={styles.largeText}>{score}</Text>
                <Text style={styles.smallText}>points</Text>
              </View>
            </View>
          </View>
          <View style={styles.instructionButton}>
            <BackgroundButton
              style={{ borderRadius: 50, height: 46, width: '60%' }}
              onPress={() => {
                setStage(stage - 2)
              }}
              title="Continue"
            />
          </View>
        </View>
      )
      break
    case 5:
      content = (
        <View style={{ height: '100%', display: 'flex', alignItems: 'center' }}>
          <View style={{ height: '9%' }}>
            <Text style={styles.title}>So close!</Text>
          </View>
          <View style={styles.blurContainer}>
            <View style={styles.blur}>
              <Text style={[styles.smallText, { marginBottom: '3%' }]}>Score</Text>
              <View style={styles.resultsContainer}>
                <Text style={styles.largeText}>{score}</Text>
                <Text style={styles.smallText}>points</Text>
              </View>
            </View>
          </View>
          <View style={styles.instructionButton}>
            <BackgroundButton
              style={{ borderRadius: 50, height: 46, width: '60%' }}
              onPress={() => {
                setStage(stage - 3)
              }}
              title="Continue"
            />
          </View>
        </View>
      )
      break
    default:
      navToResults()
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
        title={'Fill the Bar'}
        iconType={stage < 2 ? 'back' : 'close'}
        backNav={() => {
          navigation.navigate('TaskSelection', {})
        }}
      />
      <View style={styles.taskContainer}>{content}</View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  textContainer: {
    height: '50%',
    display: 'flex',
    alignItems: 'center',
    width: '100%',
    padding: '5%',
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
  resultsContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    height: '65%',
    display: 'flex',
  },
  tileContainer: {
    width: '100%',
    height: '40%',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  difficultyTile: {
    width: '42%',
    height: '85%',
    alignSelf: 'center',
    margin: '2%',
    borderWidth: 1,
    borderColor: 'white',
    borderRadius: 32,
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
  },
  taskContainer: {
    display: 'flex',
    height: '100%',
    marginTop: '5%',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
  },
  instructionContainer: {
    marginTop: '10%',
    width: '100%',
    justifyContent: 'center',
    alignContent: 'center',
  },
  instructionButton: {
    width: '100%',
    height: '15%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  instructionText: {
    fontSize: 18,
    textAlign: 'center',
    color: '#fff',
    fontFamily: Platform.OS === 'ios' ? 'Chalkboard SE' : 'Roboto',
  },
  largeText: {
    fontSize: 54,
    color: 'white',
    marginTop: '-10%',
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
})
