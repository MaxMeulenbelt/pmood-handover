import { BlurView } from 'expo-blur'
import { View, StyleSheet, Text, ImageSourcePropType, Image, Platform } from 'react-native'

type ChatBubbleProps = {
  text: string
  alignment: string
}
export default function ChatBubble(props: ChatBubbleProps) {
  const { text, alignment } = props
  let content = <div></div>
  content = <Text style={styles.smallText}>{text}</Text>
  if (text === 'heart') {
    content = (
      <Image
        // eslint-disable-next-line @typescript-eslint/no-var-requires
        source={require('frontend/assets/Assets/iOS/Heart.png') as ImageSourcePropType}
        style={{ width: 64, height: 64 }}
      />
    )
  }
  return (
    <View>
      <View
        style={
          alignment === 'left'
            ? { borderTopLeftRadius: 0, backgroundColor: 'rgba(155,155,155, 0.25)', ...styles.borderContainer }
            : { borderTopRightRadius: 0, backgroundColor: 'rgba(128,66,150, 0.25)', ...styles.borderContainer }
        }
      >
        {content}
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  borderContainer: {
    borderColor: 'white',
    display: 'flex',
    borderWidth: 1,
    borderRadius: 18,
    overflow: 'hidden',
    padding: 10,
    paddingTop: 5,
  },
  smallText: {
    fontSize: 16,
    color: 'white',
    fontFamily: Platform.OS === 'ios' ? 'Chalkboard SE' : 'Arial',
  },
})
