import { useEffect, useState } from 'react'
import { View, Text, StyleSheet, Pressable } from 'react-native'
import BackgroundButton from '../reusable/BackgroundButton'
import { LinearGradient } from 'expo-linear-gradient'

type Props = {
  difficulty: string
  winProb: number
  onComplete: (didComplete: boolean, didWin: boolean) => void
}

export default function EffortBar(props: Props) {
  const { difficulty, winProb, onComplete } = props
  const [progress, setProgress] = useState(0)
  const [borderColor, setBorderColor] = useState(difficulty === 'easy' ? '#F1C3AE' : '#C48CD8')
  const [taskFinished, setTaskFinished] = useState(false)

  const random = Math.random()

  let maxProgress = 50
  if (difficulty === 'easy') {
    maxProgress = 50
  } else {
    maxProgress = 100
  }

  /**
   * Starts a timer depending on selected difficulty.
   * If timer ends before user completes the task then the task is aborted and both didWin and didComplete are false.
   */
  useEffect(() => {
    const timeout = setTimeout(
      () => {
        if (!taskFinished) {
          onComplete(false, false)
          clearTimeout(timeout)
        }
      },
      difficulty === 'easy' ? 10000 : 19000
    )

    return () => {
      clearTimeout(timeout)
    }
  }, [])

  /**
   * Increments the progress of the progress bar every time the button is pressed.
   * If progress has reached the maximum then will check the random against the odds of winning to determine win or lose.
   */
  const updateProgress = () => {
    setProgress(progress + 1)
    if (progress === maxProgress - 1) {
      setBorderColor(difficulty === 'easy' ? '#B5795E' : '#874A9C')
      setTimeout(() => {
        if (random <= winProb) {
          onComplete(true, true)
          setTaskFinished(true)
        } else {
          onComplete(true, false)
          setTaskFinished(true)
        }
      }, 800)
    }
  }
  return (
    <View style={{ height: '100%' }}>
      <View style={[styles.progressContainer, { borderColor }]}>
        <View style={{ flex: progress / maxProgress, backgroundColor: difficulty === 'easy' ? '#FDCBB4' : '#CC94E0' }}></View>
      </View>
      <View style={styles.instructionButton}>
        <View style={{ borderRadius: 50, height: 52, width: '60%' }}>
          <Pressable style={styles.button} onPressIn={() => updateProgress()} disabled={progress === maxProgress}>
            <LinearGradient colors={['#555555', '#181818']} locations={[0, 1]} start={{ x: 0, y: 0 }} end={{ x: 0, y: 1 }} style={styles.overlay}></LinearGradient>
            <Text style={styles.text}>Press</Text>
          </Pressable>
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  progressContainer: {
    borderWidth: 4,
    backgroundColor: 'rgba(255,255,255,0.6)',
    height: '55%',
    width: '45%',
    borderRadius: 50,
    alignSelf: 'center',
    marginVertical: '20%',
    overflow: 'hidden',
    transform: [{ rotate: '180deg' }],
  },
  instructionButton: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    alignContent: 'center',
    display: 'flex',
    justifyContent: 'center',
    borderRadius: 50,
    paddingHorizontal: 16,
    elevation: 3,
    height: 46,
    width: '100%',
  },
  text: {
    fontSize: 16,
    textAlign: 'center',
    color: 'white',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    opacity: 1,
    flex: 1,
    borderRadius: 50,
  },
})
