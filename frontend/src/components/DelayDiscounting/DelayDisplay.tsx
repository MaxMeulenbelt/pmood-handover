import { ImageSourcePropType, View, StyleSheet, Text } from 'react-native'
import DelayTile from './DelayTile'
import { useState } from 'react'

type Props = {
  nowValue: number
  laterValue: number
  timeframe: string
  onPress: (arg0: string) => void
}
export default function DelayDisplay(props: Props) {
  const { nowValue, laterValue, timeframe, onPress } = props

  const [selected, setSelected] = useState<string | null>(null)
  const [disabled, setDisabled] = useState(false)

  const resetState = () => {
    setTimeout(() => {
      setSelected(null)
      setDisabled(false)
    }, 1000)
  }
  return (
    <View style={styles.promptContainer}>
      <View
        style={{
          width: '100%',
          height: '100%',
          paddingHorizontal: '4%',
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        {/* eslint-disable @typescript-eslint/no-var-requires */}
        <DelayTile
          icon={require('../../../assets/DelayDiscounting/iOS/coins.png') as ImageSourcePropType}
          selected={selected === 'now'}
          disabled={disabled}
          amount={nowValue}
          timeframe={'Now'}
          offset={5}
          onPress={() => {
            setSelected('now')
            onPress('now')
            setDisabled(true)
            resetState()
          }}
        />
        {/* eslint-disable @typescript-eslint/no-var-requires */}
        <DelayTile
          icon={require('../../../assets/DelayDiscounting/iOS/notes.png') as ImageSourcePropType}
          selected={selected === 'later'}
          disabled={disabled}
          amount={laterValue}
          timeframe={timeframe}
          offset={10}
          onPress={() => {
            setSelected('later')
            onPress('later')
            setDisabled(true)
            resetState()
          }}
        />
      </View>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>Would you rather have:</Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  promptContainer: {
    marginTop: '20%',
    height: '60%',
    width: '100%',
    display: 'flex',
  },
  titleContainer: {
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '40%',
    marginTop: '-8%',
  },
  title: {
    fontSize: 24,
    color: 'white',
    fontWeight: 'bold',
  },
})
