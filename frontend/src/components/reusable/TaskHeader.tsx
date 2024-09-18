import { Ionicons, MaterialIcons } from '@expo/vector-icons'
import { IconButton } from '@react-native-material/core'
import { View, StyleSheet, Text, Alert, Platform } from 'react-native'

type Props = {
  title: string
  iconType: string
  backNav: () => void
}
export default function TaskHeader(props: Props) {
  const { title, iconType, backNav } = props

  let content = <View></View>

  const createTwoButtonAlert = () =>
    Alert.alert('Are you sure?', 'If you leave before completing the task it could lead to your risk score being less accurate.', [
      {
        text: 'Cancel',
        onPress: () => {
          return
        },
        style: 'cancel',
      },
      { text: 'Leave', onPress: () => backNav() },
    ])

  if (iconType === 'back') {
    content = (
      <View>
        <IconButton
          icon={() => <MaterialIcons name="keyboard-backspace" size={46} color="white" />}
          onPress={() => {
            backNav()
          }}
        />
      </View>
    )
  }
  if (iconType === 'close') {
    content = (
      <View>
        <IconButton
          icon={() => <Ionicons name="close" size={32} color="white" />}
          onPress={() => {
            createTwoButtonAlert()
          }}
        />
      </View>
    )
  }
  if (iconType === 'home') {
    content = (
      <View>
        <IconButton
          icon={() => <MaterialIcons name="home-filled" size={32} color="white" />}
          onPress={() => {
            backNav()
          }}
        />
      </View>
    )
  }
  return (
    <View style={{ width: '100%', display: 'flex', paddingTop: '10%' }}>
      <View style={styles.container}>
        <View style={{ width: '20%', paddingHorizontal: 20, alignSelf: 'center', justifyContent: 'center' }}>{content}</View>
        <View style={styles.textContainer}>
          <Text style={styles.title}>{title}</Text>
        </View>
        <View style={{ width: '20%', paddingHorizontal: 20 }}></View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  textContainer: {
    width: '40%',
    marginHorizontal: 20,
  },
  title: {
    color: 'white',
    fontFamily: Platform.OS === 'ios' ? 'Chalkboard SE' : 'Arial',
    fontSize: 20,
    textAlign: 'center',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    opacity: 1,
    flex: 1,
  },
})
