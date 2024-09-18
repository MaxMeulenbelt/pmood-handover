import { BlurView } from 'expo-blur'
import { ImageSourcePropType, StyleSheet, Image, Platform, Pressable, Text, View } from 'react-native'

type Props = {
  icon: ImageSourcePropType
  disabled: boolean
  selected: boolean
  amount: number
  timeframe: string
  onPress: () => void
  offset: number
}

export default function DelayTile(props: Props) {
  const { icon, selected, amount, timeframe, onPress, offset } = props
  return (
    <Pressable style={[styles.blur, { width: '49%', height: '55%', display: 'flex' }]} onPress={() => onPress()} disabled={selected}>
      <BlurView style={{ width: '100%', height: '100%' }} intensity={selected ? 0 : 50}>
        <View style={{ width: '100%', height: '100%', justifyContent: 'center' }}>
          <Image style={{ alignSelf: 'center', transform: [{ translateX: offset }] }} source={icon} />
          <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'baseline', justifyContent: 'center' }}>
            <Text style={styles.text}>£</Text>
            <Text style={[styles.text, { fontSize: 32 }]}>{amount}</Text>
          </View>
          <Text style={[styles.text, { alignSelf: 'center' }]}>{timeframe}</Text>
        </View>
      </BlurView>
    </Pressable>
  )
}

const styles = StyleSheet.create({
  blur: {
    borderRadius: 42,
    overflow: 'hidden',
    backgroundColor: 'rgba(225,220,220, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: 'white',
    borderWidth: 1,
  },
  selected: {
    borderRadius: 42,
    overflow: 'hidden',
    backgroundColor: 'rgba(151, 151, 151, 0.2)',
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: 'white',
    borderWidth: 1,
  },
  text: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
})
