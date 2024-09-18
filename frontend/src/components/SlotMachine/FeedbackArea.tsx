import React, { useContext, useState } from 'react'
import { Pressable, StyleSheet, View, Text } from 'react-native'
import RatingBox from './RatingBox'
import Reminder from './Reminder'
import { SlotsContext } from '../../lib/slotMachine'
import BackgroundButton from '../reusable/BackgroundButton'

type Props = {
  onRefresh: () => void
  onPlay: () => void
  sendData: () => void
  initStage: number
}

function FeedbackArea(props: Props) {
  const { onRefresh, onPlay, sendData, initStage } = props

  const context = useContext(SlotsContext)

  const [stage, setStage] = useState(initStage)
  const previousStage = useState(0)

  let content = <View></View>

  switch (stage) {
    case 0:
      previousStage[0] = 0
      if (context) {
        content = (
          <View style={{ marginTop: '20%', width: '100%', alignItems: 'center' }}>
            <BackgroundButton
              disabled={context.selected}
              style={{ borderRadius: 50, height: 46, alignSelf: 'center', width: '60%' }}
              onPress={() => {
                onPlay()
              }}
              title={'Spin'}
            />
          </View>
        )
      }
      break
    case 1:
      previousStage[0] = 1
      content = (
        <View style={styles.feedbackBox}>
          <RatingBox
            text="How pleased are you?"
            onSubmit={(newValue: number[]) => {
              if (context) {
                context.feedbackHappy = newValue[0]
              }
              setStage(2)
            }}
          />
        </View>
      )
      break
    case 2:
      previousStage[0] = 2
      content = (
        <View style={styles.feedbackBox}>
          <RatingBox
            text="How much do you want to continue gambling?"
            onSubmit={(newValue: number[]) => {
              if (context) {
                context.feedbackContinue = newValue[0]
              }
              sendData()
              onRefresh()
            }}
          />
        </View>
      )
      break
  }
  return <View style={styles.container}>{content}</View>
}

const styles = StyleSheet.create({
  feedbackBox: {
    width: '100%',
    alignItems: 'center',
  },
  container: {
    flex: 1,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    paddingBottom: '15%',
    width: '100%',
  },
})

export default FeedbackArea
