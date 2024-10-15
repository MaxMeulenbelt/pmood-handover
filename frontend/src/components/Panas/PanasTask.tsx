import React, { useState, useEffect } from 'react'
import { ImageSourcePropType, Platform, StyleSheet, Text, View } from 'react-native'
import Slider from '@react-native-community/slider'
import BackgroundButton from '../reusable/BackgroundButton'
import TypingText from '../reusable/TypingText'
import panasQuestionList from '../../lib/panasQuestionList'
import api from '../../lib/api'
import { Image } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient'
import TaskHeader from '../reusable/TaskHeader'
import navigation from '../../lib/navigation'

const questionList: string[] = panasQuestionList.questionList

function getDescription(i: number) {
  switch (i) {
    case 1:
      return 'Not at all'
    case 2:
      return 'A little'
    case 3:
      return 'Moderately'
    case 4:
      return 'Quite a bit'
    case 5:
      return 'Extremely'
    default:
      return 'error'
  }
}

/**
 * The PANAS quiz. It runs through a total of 20 questions (4 pages). 5 questions at a time are shown at a time,
 * with a slider (1-5) answer for each question.
 *
 * Answers:
 * 0: no answer
 * 1: very slightly or not at all
 * 2. A little
 * 3. Moderately
 * 4. Quite a little
 * 5. Extremely
 */
export default function PanasTask() {
  const [page, setPage] = useState<number>(0)
  const [questionNo1, setQuestionNo1] = useState<number>(0)
  const [questionNo2, setQuestionNo2] = useState<number>(1)
  const [questionNo3, setQuestionNo3] = useState<number>(2)
  const [questionNo4, setQuestionNo4] = useState<number>(3)
  const [questionNo5, setQuestionNo5] = useState<number>(4)

  const [currentAnswer1, setCurrentAnswer1] = useState<number>(0)
  const [currentAnswer2, setCurrentAnswer2] = useState<number>(0)
  const [currentAnswer3, setCurrentAnswer3] = useState<number>(0)
  const [currentAnswer4, setCurrentAnswer4] = useState<number>(0)
  const [currentAnswer5, setCurrentAnswer5] = useState<number>(0)

  const [allAnswers, setAllAnswers] = useState<number[]>([])

  function nextQuestion() {
    setQuestionNo1(questionNo1 + 5)
    setQuestionNo2(questionNo2 + 5)
    setQuestionNo3(questionNo3 + 5)
    setQuestionNo4(questionNo4 + 5)
    setQuestionNo5(questionNo5 + 5)
    addAnswerToEnd()
    setCurrentAnswer1(3)
    setCurrentAnswer2(3)
    setCurrentAnswer3(3)
    setCurrentAnswer4(3)
    setCurrentAnswer5(3)
  }

  function addAnswerToEnd() {
    const allAnswers2 = allAnswers
    allAnswers2.push(currentAnswer1)
    allAnswers2.push(currentAnswer2)
    allAnswers2.push(currentAnswer3)
    allAnswers2.push(currentAnswer4)
    allAnswers2.push(currentAnswer5)
    setAllAnswers(allAnswers2)
  }

  function resetAll() {
    setQuestionNo1(0)
    setQuestionNo2(1)
    setQuestionNo3(2)
    setQuestionNo4(3)
    setQuestionNo5(4)
    setCurrentAnswer1(3)
    setCurrentAnswer2(3)
    setCurrentAnswer3(3)
    setCurrentAnswer4(3)
    setCurrentAnswer5(3)
    setAllAnswers([])
  }

  function nextPage() {
    setPage(page + 1)
  }

  useEffect(() => {
    resetAll()
  }, [])

  let content = <View></View>

  switch (page) {
    case 0: // Instructions
      content = (
        <View style={{ height: '100%', display: 'flex', alignItems: 'center' }}>
          <View style={{ height: '20%', marginTop: '10%' }}>
            {/* eslint-disable @typescript-eslint/no-var-requires */}
            <Image
              style={{ transform: [{ scale: 0.8 }], height: 176, width: 176 }}
              source={require('frontend/assets/GameThumbnails/iOS/how-doyou-feel-now.png') as ImageSourcePropType}
            />
          </View>
          <View style={{ height: '50%', display: 'flex', alignItems: 'center', width: '100%', padding: '5%' }}>
            <View style={styles.instructionContainer}>
              <Text style={styles.instructionText}>
                It's time to log your mood.{'\n'}
                {'\n'}How do you feel right now for each emotion?{'\n'}
                {'\n'}Slide the bar from not at all to extremely.{'\n'}
                {'\n'} Don't worry, there are no right or wrong answers just go with how you feel.
              </Text>
            </View>
            <View style={styles.instructionButton}>
              <BackgroundButton
                style={{ borderRadius: 50, height: 46, width: '60%' }}
                onPress={() => {
                  setPage(page + 1)
                }}
                title="Let's Try"
              />
            </View>
          </View>
        </View>
      )
      break

    case 1: // Quiz
      if (questionNo1 < questionList.length) {
        content = (
          <View>
            <View style={styles.container}>
              <View style={{ alignItems: 'center' }}>
                <Text style={styles.wordText}>{questionList[questionNo1]}</Text>
                <Slider
                  style={{ width: 300, height: 40 }}
                  minimumValue={1}
                  maximumValue={5}
                  value={currentAnswer1}
                  minimumTrackTintColor="#000000"
                  maximumTrackTintColor="#000000"
                  step={1}
                  onSlidingComplete={(v) => setCurrentAnswer1(v)}
                />
                <Text style={{ color: '#fff' }}> {getDescription(currentAnswer1)} </Text>
              </View>

              <View style={{ alignItems: 'center' }}>
                <Text style={styles.wordText}>{questionList[questionNo2]}</Text>
                <Slider
                  style={{ width: 300, height: 40 }}
                  minimumValue={1}
                  maximumValue={5}
                  value={currentAnswer2}
                  minimumTrackTintColor="#000000"
                  maximumTrackTintColor="#000000"
                  step={1}
                  onSlidingComplete={(v) => setCurrentAnswer2(v)}
                />
                <Text style={{ color: '#fff' }}> {getDescription(currentAnswer2)} </Text>
              </View>

              <View style={{ alignItems: 'center' }}>
                <Text style={styles.wordText}>{questionList[questionNo3]}</Text>
                <Slider
                  style={{ width: 300, height: 40 }}
                  minimumValue={1}
                  maximumValue={5}
                  value={currentAnswer3}
                  minimumTrackTintColor="#000000"
                  maximumTrackTintColor="#000000"
                  step={1}
                  onSlidingComplete={(v) => setCurrentAnswer3(v)}
                />
                <Text style={{ color: '#fff' }}> {getDescription(currentAnswer3)} </Text>
              </View>

              <View style={{ alignItems: 'center' }}>
                <Text style={styles.wordText}>{questionList[questionNo4]}</Text>
                <Slider
                  style={{ width: 300, height: 40 }}
                  minimumValue={1}
                  maximumValue={5}
                  value={currentAnswer4}
                  minimumTrackTintColor="#000000"
                  maximumTrackTintColor="#000000"
                  step={1}
                  onSlidingComplete={(v) => setCurrentAnswer4(v)}
                />
                <Text style={{ color: '#fff' }}> {getDescription(currentAnswer4)} </Text>
              </View>

              <View style={{ alignItems: 'center' }}>
                <Text style={styles.wordText}>{questionList[questionNo5]}</Text>
                <Slider
                  style={{ width: 300, height: 40 }}
                  minimumValue={1}
                  maximumValue={5}
                  value={currentAnswer5}
                  minimumTrackTintColor="#000000"
                  maximumTrackTintColor="#000000"
                  step={1}
                  onSlidingComplete={(v) => setCurrentAnswer5(v)}
                />
                <Text style={{ color: '#fff' }}> {getDescription(currentAnswer5)} </Text>
              </View>
            </View>
            <View style={styles.instructionButton}>
              <BackgroundButton
                style={{ borderRadius: 50, height: 46, width: '60%' }}
                onPress={() => {
                  nextQuestion()
                }}
                title="Next Question"
              />
            </View>
            {/* <BackgroundButton title="Next Question" onPress={nextQuestion} style={styles.button} /> */}
          </View>
        )
        break
      } else {
        // Send all answers as CSV to database
        const data = {
          interested: allAnswers[0],
          distressed: allAnswers[1],
          excited: allAnswers[2],
          upset: allAnswers[3],
          strong: allAnswers[4],
          guilty: allAnswers[5],
          scared: allAnswers[6],
          hostile: allAnswers[7],
          enthusiastic: allAnswers[8],
          proud: allAnswers[9],
          irritable: allAnswers[10],
          alert: allAnswers[11],
          ashamed: allAnswers[12],
          inspired: allAnswers[13],
          nervous: allAnswers[14],
          determined: allAnswers[15],
          attentive: allAnswers[16],
          jittery: allAnswers[17],
          active: allAnswers[18],
          afraid: allAnswers[19],
        }
        api.taskAPIRequest('panas', data).catch((e) => void e)
        return (
          <View style={styles.container}>
            <Text style={styles.finishedText}>Thank you for completing this task! </Text>
          </View>
        )
      }
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
        iconType={page < 1 ? 'back' : 'close'}
        backNav={() => {
          navigation.navigate('TaskSelection')
        }}
      />
      <View style={styles.taskContainer}>{content}</View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    height: '75%',
    marginTop: '10%',
    justifyContent: 'space-between',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    opacity: 1,
  },
  taskContainer: {
    display: 'flex',
    height: '100%',
  },
  instructionContainer: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignContent: 'center',
    marginTop: '5%',
  },
  instructionButton: {
    width: '100%',
    height: '15%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: '-3%',
  },
  instructionText: {
    fontSize: 18,
    textAlign: 'center',
    marginBottom: 32,
    color: '#fff',
    fontFamily: Platform.OS === 'ios' ? 'Chalkboard SE' : 'Roboto',
  },
  horizontalContainer: {
    flexDirection: 'row',
  },
  button: {
    marginLeft: 50,
    marginRight: 50,
    marginTop: 50,
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
  finishedText: {
    fontSize: 18,
    color: '#fff',
    textAlign: 'center',
  },
  wordText: {
    fontSize: 30,
    color: '#fff',
    fontWeight: 'bold',
  },
  biggerWordText: {
    fontSize: 20,
    color: '#fff',
    textAlign: 'center',
  },
})
