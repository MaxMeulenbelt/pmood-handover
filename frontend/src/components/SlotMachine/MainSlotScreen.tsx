import React, { useMemo, useState } from 'react'
import { ImageBackground, ImageSourcePropType, StyleSheet, Text, View, Image, Platform } from 'react-native'
import Machine from './SlotMachine'
import FeedbackArea from './FeedbackArea'
import { SlotsContext } from '../../lib/slotMachine'
import SlotsContextActions from '../../models/SlotMachine/SlotsContextActions'
import api from '../../lib/api'
import { LinearGradient } from 'expo-linear-gradient'
import TaskHeader from '../reusable/TaskHeader'
import navigation from '../../lib/navigation'
import BackgroundButton from '../reusable/BackgroundButton'

function MainSlotScreen() {
  console.log('hello')
  const [selected, setSelected] = useState(false)

  const [balanceText, setBalanceText] = useState('Pick a shape')

  const [totalPoints, setTotalPoints] = useState(10)

  const [showFeedback, setShowFeedback] = useState(false)

  const [spinStart, setSpinStart] = useState(Math.floor(Math.random() * 6))

  const [stage, setStage] = useState(0)

  // the minimum and maximum number of fair games can be changed by changing the fairGamesCount
  const slotsContext = useMemo<SlotsContextActions | null>(
    () => ({
      selectIcon: 0,
      endIcon: Math.floor(Math.random() * 6),
      numberOfGamesPlayed: 0,
      feedbackHappy: 0,
      feedbackContinue: 0,
      win: false,
      selected: false,
      nearMiss: false,
      fairGamesCount: 6 + Math.floor(Math.random() * 6),
    }),
    []
  )

  const updateBalance = (reset: boolean) => {
    if (slotsContext) {
      if (slotsContext.win === true) {
        setBalanceText('You win 7 points!')
      } else {
        // setTotalPoints(totalPoints - 1)
        setBalanceText('You lose 1 point!')
      }
      if (reset) {
        setBalanceText('Pick a shape')
      }
    }
  }

  const data = {
    numberOfGamesPlayed: 0,
    win: false,
    feedbackHappy: 0,
    feedbackContinue: 0,
    nearMiss: false,
  }

  const sendData = () => {
    if (slotsContext) {
      data.numberOfGamesPlayed = slotsContext.numberOfGamesPlayed
      data.win = slotsContext.win
      data.feedbackHappy = slotsContext.feedbackHappy
      data.feedbackContinue = slotsContext.feedbackContinue
      data.nearMiss = slotsContext.nearMiss
    }
    api.taskAPIRequest('slot-machine', data).catch((e) => void e)
  }

  let content = <View></View>
  switch (stage) {
    case 0:
      content = (
        <View style={{ height: '100%', display: 'flex', alignItems: 'center' }}>
          <View style={{ height: '20%', paddingTop: '5%' }}>
            {/* eslint-disable-next-line @typescript-eslint/no-var-requires */}
            <Image style={{ height: 176, width: 176 }} source={require('frontend/assets/GameThumbnails/iOS/slot-machine.png') as ImageSourcePropType} />
          </View>
          <View style={styles.textContainer}>
            <View style={styles.instructionContainer}>
              <Text style={styles.instructionText}>
                Can you match the fruits?{'\n'}
                {'\n'}
                You've probably played a slot machine game before, but here your game data will be used to analyse behaviours influencing your mood.{'\n'}
                {'\n'}
                Your goal is to earn as many points as possible by matching identical patterns.{'\n'}
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
            <Image style={{ height: 176, width: 176 }} source={require('frontend/assets/GameThumbnails/iOS/slot-machine.png') as ImageSourcePropType} />
          </View>
          <View style={styles.textContainer}>
            <View style={styles.instructionContainer}>
              <Text style={styles.instructionText}>
                Unlike the other games you've tried so far, there is no definite end to this game.{'\n'}
                {'\n'}
                You will be prompted for feedback after every spin, but are free to keep playing for as long as you are enjoying yourself!{'\n'}
                {'\n'}
                When the game starts, choose a fruit by swiping on the left side of the machine and spin the wheel to see if you get a match.
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
    default:
      content = (
        <>
          <View style={{ marginTop: '8%', marginBottom: '-12%' }}>
            <Text style={styles.balance}>{`Points: ${totalPoints}`}</Text>
            <Text style={{ ...styles.balance, fontSize: 20 }}>{balanceText}</Text>
          </View>
          <View style={styles.machineContainer}>
            <Machine selected={selected} spinStart={spinStart} />
          </View>

          <View style={styles.feedbackContainer}>
            <FeedbackArea
              key={Math.random()}
              initStage={showFeedback ? 1 : 0}
              onPlay={() => {
                setSelected(true)
                setTimeout(() => {
                  if (slotsContext) {
                    slotsContext.numberOfGamesPlayed += 1
                    slotsContext.selected = true
                    if (slotsContext.selectIcon === slotsContext.endIcon) {
                      slotsContext.win = true
                      setTotalPoints(totalPoints + 7)
                    } else {
                      slotsContext.win = false
                      setTotalPoints(totalPoints - 1)
                      if (slotsContext.selectIcon - 1 === slotsContext.endIcon || slotsContext.selectIcon + 1 === slotsContext.endIcon) {
                        slotsContext.nearMiss = true
                      }
                    }
                  }
                  setShowFeedback(true)
                  updateBalance(false)
                }, 3200)
              }}
              sendData={() => {
                if (slotsContext) {
                  slotsContext.numberOfGamesPlayed += 1
                  sendData()
                }
              }}
              onRefresh={() => {
                setSelected(false)
                setSpinStart(Math.floor(Math.random() * 6))
                setShowFeedback(false)
                updateBalance(true)
                if (slotsContext) {
                  slotsContext.selected = false
                }
              }}
            />
          </View>
        </>
      )
      break
  }
  return (
    <SlotsContext.Provider value={slotsContext}>
      <View style={styles.container}>
        <LinearGradient
          colors={['#CC94E0', '#E097D8', '#F6C19E', '#FDCBB4']}
          locations={[0, 0.45, 0.75, 1]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.overlay}
        ></LinearGradient>
        <TaskHeader
          title={'Slot Machine'}
          iconType={stage > 0 ? 'close' : 'back'}
          backNav={() => {
            navigation.navigate('TaskSelection')
          }}
        />
        {content}
      </View>
    </SlotsContext.Provider>
  )
}

const styles = StyleSheet.create({
  balance: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
  },
  machineContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  container: {
    flex: 1,
    alignItems: 'center',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
  },
  feedbackContainer: {
    display: 'flex',
    position: 'absolute',
    height: '25%',
    width: '100%',
    // justifyContent: 'flex-end',
    alignItems: 'center',
    marginTop: '160%',
  },
  instructionContainer: {
    marginTop: '10%',
    width: '100%',
    justifyContent: 'center',
    alignContent: 'center',
  },
  instructionButton: {
    width: '100%',
    height: '10%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  textContainer: {
    height: '55%',
    display: 'flex',
    alignItems: 'center',
    width: '100%',
    padding: '5%',
  },
  instructionText: {
    fontSize: 18,
    textAlign: 'center',
    color: '#fff',
    fontFamily: Platform.OS === 'ios' ? 'Chalkboard SE' : 'Roboto',
  },
})

export default MainSlotScreen
