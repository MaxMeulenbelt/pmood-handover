import React, { useState, useEffect, useRef } from 'react'
import { StyleSheet, Text, View, SafeAreaView, TextInput, ImageSourcePropType, Image, Platform } from 'react-native'
import { Canvas, CanvasRef } from '@benjeau/react-native-draw'
import ShowRecallWords from './ShowRecallWords'
import BackgroundButton from '../reusable/BackgroundButton'
import ProgressBar from '../reusable/ProgressBar'
import memoryWords from '../../lib/memoryWords'
import api from '../../lib/api'
import { LinearGradient } from 'expo-linear-gradient'
import TaskHeader from '../reusable/TaskHeader'
import navigation from '../../lib/navigation'
import DistractionTile from './DistractionTile'
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons'
import RootStackParamList from '../../models/RootStackParamList'
import { NativeStackScreenProps } from '@react-navigation/native-stack'

type Props = NativeStackScreenProps<RootStackParamList, 'MemoryRecall'>

/**
 * Memory game
 * Shows 20 words to user, 5 seconds each
 * After words are complete, do a distraction task (drawing) for 1 minute
 * After distraction task, user inputs all words they can remember for 1 minute
 * At the end, show final score
 */
export default function MemoryRecallTask(props: Props) {
  const [page, setPage] = useState<number>(0) // Which page you are on
  const [wordsRemembered, setWordsRemembered] = useState<string>('') // The words returned by user
  const [allWordsRemembered, setAllWordsRemembered] = useState<string>('')
  const [symbol, setSymbol] = useState<number>(1)
  const [numberOfSymbols, setNumberOfSymbols] = useState<number>(0)
  const [finished, setFinished] = useState(false)

  const canvasRef = useRef<CanvasRef>(null)

  const numberOfWords = 5
  const secondsPerWord = 5

  const goodWords: string[] = memoryWords.goodWords
  const badWords: string[] = memoryWords.badWords

  let goodWordsPicked: string[] = []
  let badWordsPicked: string[] = []

  const symbols = ['⦿', '△', '▽', '+', '-', '[', ']', '⥤', '⥢']

  /**
   * Resets memory after test
   */
  function reset() {
    goodWordsPicked = []
    badWordsPicked = []
  }

  const handleClear = () => {
    canvasRef.current?.clear()
  }

  function nextPage() {
    setPage(page + 1)
  }
  /**
   * Get the overall number of words returned that are in goodWordsPicked and badWordsPicked
   */
  const getScore = (rememberedWords: string) => {
    let score = 0
    const words = rememberedWords.toString().toLowerCase().split(' ')
    // console.log(words)
    const allWordsPicked = goodWordsPicked.concat(badWordsPicked)
    console.log(allWordsPicked)
    for (const word of words) {
      if (allWordsPicked.includes(word)) {
        console.log(word)
        score++
      }
    }
    console.log(score)
    return score
  }

  const getPositiveScore = (rememberedWords: string) => {
    let score = 0
    const words = rememberedWords.toString().toLowerCase().split(' ')
    for (const word of words) {
      if (goodWordsPicked.includes(word)) {
        score++
      }
    }
    return score
  }

  const getNegativeScore = (rememberedWords: string) => {
    let score = 0
    const words = rememberedWords.toString().toLowerCase().split(' ')
    for (const word of words) {
      if (badWordsPicked.includes(word)) {
        score++
      }
    }
    return score
  }

  /**
   * Pick a random word from `goodWords` or `badWords`
   */
  const getRandomWord = (): string => {
    // 50% chance of positive word, and vice versa
    if (Math.random() < 0.5) {
      // Pick random word from good list
      const index = Math.floor(Math.random() * goodWords.length)
      if (goodWordsPicked.includes(goodWords[index].toLowerCase())) {
        return getRandomWord()
      }
      // Remember word picked
      goodWordsPicked.push(goodWords[index].toLowerCase())

      return goodWords[index].toLowerCase()
    } else {
      // Pick random word from good list
      const index = Math.floor(Math.random() * badWords.length)
      if (badWordsPicked.includes(badWords[index].toLowerCase())) {
        return getRandomWord()
      }
      // Remember word picked
      badWordsPicked.push(badWords[index].toLowerCase())
      return badWords[index].toLowerCase()
    }
  }

  const getRandomWordArr = () => {
    let returnString = ''
    for (let i = 0; i < numberOfWords; i++) {
      returnString = returnString.concat(getRandomWord(), ',')
    }
    return returnString
  }

  /**
   * Resets states after test finishes
   */
  function resetAll() {
    reset()
    setWordsRemembered('')
    setAllWordsRemembered('')
    setSymbol(Math.floor(Math.random() * 9) + 1)
    setNumberOfSymbols(0)
  }

  function addToEnd() {
    setAllWordsRemembered(allWordsRemembered + ' ' + wordsRemembered)
    setWordsRemembered('')
  }

  function submitSymbol() {
    handleClear()
    setSymbol(Math.floor(Math.random() * 9 + 1))
    setNumberOfSymbols(numberOfSymbols + 1)
  }

  const navToResults = () => {
    setFinished(true)

    const score = getScore(allWordsRemembered)

    const data = {
      numberOfWordsRemembered: score,
      numberOfPositiveWordsRemembered: getPositiveScore(allWordsRemembered),
      numberOfNegativeWordsRemembered: getNegativeScore(allWordsRemembered),
    }

    api.taskAPIRequest('memory-recall', data).catch((e) => void e)

    props.navigation.popToTop()
    navigation.navigate('MemoryResults', { score })
  }

  // When showing the words, update every 5 seconds
  // useEffect(() => {
  //   resetAll()
  // }, [])

  let content = <View></View>

  switch (page) {
    case 0:
      content = (
        <View style={{ height: '100%', display: 'flex', alignItems: 'center' }}>
          <View style={{ height: '20%', paddingTop: '15%' }}>
            {/* eslint-disable-next-line @typescript-eslint/no-var-requires */}
            <Image style={{ transform: [{ scale: 1.2 }] }} source={require('frontend/assets/GameThumbnails/iOS/memory-recall.png') as ImageSourcePropType} />
          </View>
          <View style={{ height: '80%', display: 'flex', alignItems: 'center', width: '100%' }}>
            <View style={styles.instructionContainer}>
              <Text style={[styles.instructionText, { fontFamily: Platform.OS === 'ios' ? 'Chalkboard SE' : 'Arial' }]}>
                Let's test your memory!{'\n'}
                {'\n'}Your goal is to remember as many words as possible in a short amount of time. 20 words will appear 1 by 1, every 5 seconds.{'\n'}
                {'\n'}Then, we'll play a short drawing game before seeing how many words you remember.
              </Text>
            </View>
            <View style={styles.instructionButton}>
              <BackgroundButton
                style={{ borderRadius: 50, height: 46, width: '60%' }}
                onPress={() => {
                  setPage(page + 1)
                }}
                title="Start"
              />
            </View>
          </View>
        </View>
      )
      break
    case 1: // Displaying words
      const randomWords = getRandomWordArr()
      const wordTimeout = setTimeout(() => {
        nextPage()
        clearTimeout(wordTimeout)
      }, secondsPerWord * numberOfWords * 1000)
      content = (
        <View style={styles.container}>
          <ShowRecallWords allWords={randomWords} secondsPerWord={secondsPerWord} />
        </View>
      )
      break
    case 2: // Distraction game instructions
      let num1 = 1
      content = (
        <View style={{}}>
          <Text style={[styles.instructionText, { marginTop: '5%', fontSize: 16, paddingHorizontal: '5%' }]}>
            Now for the next game. In the next 60 seconds, draw the corresponding symbol to the random number appearing, as quickly and accurately as you can. {'\n'}
          </Text>
          <Text style={{ textAlign: 'center', color: 'white', fontSize: 20, fontWeight: 'bold', marginBottom: '5%' }}>Example</Text>
          <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-evenly', flexWrap: 'wrap', margin: '15%', marginTop: '0%', marginBottom: '8%' }}>
            {symbols.map((s: string) => (
              <DistractionTile num={num1++} symbol={s} key={num1} />
            ))}
          </View>
          <View>
            <Text style={styles.symbolText2}>8</Text>
            <View style={{ height: 300, backgroundColor: 'rgba(0,0,0,0.12)' }}></View>
            <View style={[styles.exampleContainer, { width: '20%', marginTop: '13%', marginLeft: '11%' }]}>
              <Text
                style={{
                  textAlign: 'center',
                  fontSize: 50,
                  color: 'white',
                }}
              >
                ⥢
              </Text>
            </View>
            <View style={[styles.exampleContainer, { width: '10%', height: '32%', marginTop: '13%', marginLeft: '61%' }]}>
              <Text
                style={{
                  textAlign: 'center',
                  fontSize: 50,
                  color: 'white',
                }}
              >
                ⥤
              </Text>
            </View>
            <View style={{ position: 'absolute', alignItems: 'center', width: '50%', marginTop: '35%' }}>
              <MaterialCommunityIcons
                name={'checkbox-blank-circle'}
                color={'#ffffff'}
                style={{ position: 'absolute', transform: [{ translateX: 2 }, { translateY: 2 }] }}
                size={50}
              />
              <MaterialCommunityIcons name={'close-circle'} color={'#DC3F3F'} style={{ position: 'absolute' }} size={60} />
            </View>
            <View style={{ position: 'absolute', alignItems: 'center', width: '150%', marginTop: '35%', marginLeft: '1%' }}>
              <MaterialCommunityIcons
                name={'checkbox-blank-circle'}
                color={'#ffffff'}
                style={{ position: 'absolute', transform: [{ translateX: 1 }, { translateY: 4 }] }}
                size={50}
              />
              <Ionicons name={'checkmark-circle'} color={'#8ADA7C'} style={{ position: 'absolute', transform: [{ translateX: 1 }, { translateY: -2 }] }} size={60} />
            </View>
            <BackgroundButton title="Start" onPress={nextPage} style={[styles.button, { position: 'absolute', alignSelf: 'center', marginTop: '52%' }]} />
          </View>
        </View>
      )
      break
    case 3: // Distraction game
      const distractionTimeout = setTimeout(() => {
        nextPage()
        clearTimeout(distractionTimeout)
      }, 60000)
      let num2 = 1
      content = (
        <View style={styles.container}>
          <ProgressBar totalSeconds={60} key={0} />
          <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-evenly', flexWrap: 'wrap', margin: '15%', marginTop: '20%', marginBottom: '8%' }}>
            {symbols.map((s: string) => (
              <DistractionTile num={num2++} symbol={s} key={num2} />
            ))}
          </View>
          <View>
            <Text style={styles.symbolText2}>{symbol}</Text>
            <Canvas ref={canvasRef} height={260} color="white" thickness={10} style={{ backgroundColor: 'rgba(0,0,0,0.12)' }} />
          </View>
          <View style={styles.horizontalContainer}>
            <BackgroundButton title="Clear" onPress={handleClear} style={styles.button} />
            <BackgroundButton title="Submit" onPress={submitSymbol} style={styles.button} />
          </View>
        </View>
      )
      break
    case 4: // recall
      const currentTimeout = setTimeout(() => {
        if (!finished) {
          navToResults()
          clearTimeout(currentTimeout)
        }
      }, 60000)
      content = (
        <View style={styles.container}>
          <View style={styles.progressBarContainer}>
            <ProgressBar totalSeconds={60} key={1} />
          </View>

          <SafeAreaView>
            <Text style={styles.biggerWordText}>Please enter the words you remember.</Text>
            <Text style={styles.biggerWordText}> Words recalled:</Text>
            <Text style={styles.smallText}> {allWordsRemembered} </Text>
          </SafeAreaView>
          <TextInput defaultValue={wordsRemembered} style={styles.input} onChangeText={(e) => setWordsRemembered(e)} />

          <View style={styles.horizontalContainer}>
            <BackgroundButton title="Add word" onPress={addToEnd} style={styles.button} />
            <BackgroundButton title="Finish" onPress={navToResults} style={styles.button} />
          </View>
        </View>
      )
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
        title={'Memory Recall'}
        iconType={page > 0 ? 'close' : 'back'}
        backNav={() => {
          navigation.navigate('TaskSelection')
        }}
      />
      {content}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    opacity: 1,
  },
  exampleContainer: {
    position: 'absolute',
    backgroundColor: 'rgba(13,13,13,0.4)',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 24,
    width: '25%',
    height: '25%',
  },
  instructionContainer: {
    paddingHorizontal: 32,
    paddingTop: '25%',
    width: '100%',
    height: '60%',
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
  horizontalContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    padding: 20,
  },
  button: {
    marginHorizontal: '10%',
    width: '30%',
  },
  input: {
    height: 40,
    margin: 10,
    borderWidth: 1,
    padding: 10,
    width: 200,
  },
  progressBarContainer: {
    padding: 10,
  },
  wordText: {
    fontSize: 50,
    fontWeight: 'bold',
  },
  biggerWordText: {
    fontSize: 20,
    textAlign: 'center',
  },
  smallText: {
    fontSize: 15,
    textAlign: 'center',
    fontStyle: 'italic',
  },
  symbolText: {
    fontSize: 30,
    width: 100,
  },
  symbolText2: {
    fontSize: 70,
    textAlign: 'center',
    position: 'absolute',
    alignSelf: 'center',
    color: 'white',
  },
  instructionText: {
    fontSize: 18,
    textAlign: 'center',
    color: '#fff',
  },
  finishedText: {
    fontSize: 18,
    textAlign: 'center',
  },
  shareButton: {
    marginTop: '15%',
  },
})
