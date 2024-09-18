import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons'
import { BlurView } from 'expo-blur'
import { ImageSourcePropType, StyleSheet, Image, Platform, Pressable, View } from 'react-native'

type Props = {
  symbol: ImageSourcePropType
  disabled: boolean
  selected: boolean
  onPress: () => void
  correct?: boolean
  training: boolean
}
export default function StimTile(props: Props) {
  const { symbol, selected, onPress, correct, training } = props
  console.log(correct)
  let feedbackIcon = <></>

  if (correct && selected) {
    feedbackIcon = (
      <View style={styles.feedbackContainer}>
        <MaterialCommunityIcons name={'checkbox-blank-circle'} color={'#ffffff'} style={{ position: 'absolute' }} size={60} />
        <Ionicons name={'checkmark-circle'} color={'#8ADA7C'} style={{ position: 'absolute' }} size={70} />
      </View>
    )
  } else if (!correct && selected) {
    feedbackIcon = (
      <View style={styles.feedbackContainer}>
        <MaterialCommunityIcons name={'checkbox-blank-circle'} color={'#ffffff'} style={{ position: 'absolute' }} size={60} />
        <MaterialCommunityIcons name={'close-circle'} color={'#DC3F3F'} style={{ position: 'absolute' }} size={70} />
      </View>
    )
  }
  return (
    <View style={{ width: '49%', height: '70%', marginTop: '20%' }}>
      <Pressable
        style={[
          styles.blur,
          { display: 'flex', height: '80%' },
          training && correct && selected ? { backgroundColor: 'rgba(152,251,152, 0.5)' } : {},
          training && !correct && selected ? { backgroundColor: 'rgba(220,63,63, 0.4)' } : {},
        ]}
        onPress={() => onPress()}
        disabled={selected}
      >
        <BlurView style={{ width: '100%', height: '100%' }} intensity={selected ? 0 : 50} />
        <Image style={{ tintColor: 'white', position: 'absolute' }} source={symbol} />
      </Pressable>
      {training && feedbackIcon}
    </View>
  )
}

const styles = StyleSheet.create({
  blur: {
    borderRadius: 42,
    overflow: 'hidden',
    backgroundColor: 'rgba(225,220,220, 0.2)',
    borderColor: 'white',
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  feedbackContainer: {
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    marginTop: '162%',
  },
})
