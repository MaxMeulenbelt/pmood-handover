import { LinearGradient } from 'expo-linear-gradient'
import { ReactNode } from 'react'
import { ImageBackground, ImageSourcePropType, View, StyleSheet } from 'react-native'

type ScreenProps = {
  children?: ReactNode | undefined
}

export default function ScreenWrapper(props: ScreenProps) {
  return (
    <View style={{ flex: 1 }}>
      <LinearGradient
        colors={['#CC94E0', '#E097D8', '#F6C19E', '#FDCBB4']}
        locations={[0, 0.45, 0.75, 1]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.overlay}
      ></LinearGradient>
      <ImageBackground
        // eslint-disable-next-line @typescript-eslint/no-var-requires
        source={require('frontend/assets/Assets/iOS/background.png') as ImageSourcePropType}
        imageStyle={{ opacity: 0.55 }}
        style={{ flex: 1 }}
      >
        {props.children}
      </ImageBackground>
    </View>
  )
}
const styles = StyleSheet.create({
  overlay: {
    ...StyleSheet.absoluteFillObject,
    opacity: 1,
    flex: 1,
  },
})
