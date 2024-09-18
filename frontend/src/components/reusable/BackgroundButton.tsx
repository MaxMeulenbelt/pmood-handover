import { LinearGradient } from 'expo-linear-gradient'
import React from 'react'
import { Text, StyleSheet, Pressable, StyleProp, ViewStyle, ImageSourcePropType, View, Image } from 'react-native'

type Props = {
  onPress: () => void
  title?: string
  disabled?: boolean
  style?: StyleProp<ViewStyle>
  image?: ImageSourcePropType
}

/**
 * A button with a rounded rectangle background.
 *
 * @prop onPress The function to call when the button is pressed.
 * @prop title The text to display on the button.
 * @prop disabled Whether the button should be disabled.
 * @prop style Additional styles to apply to the button.
 */
export default function Button(props: Props) {
  const { onPress, title, disabled, style, image } = props
  let content = <View></View>
  if (image) {
    content = (
      <Pressable onPress={onPress} disabled={disabled}>
        <Image style={{ resizeMode: 'contain', width: 64, height: 64, position: 'absolute', alignSelf: 'center' }} source={image} />
      </Pressable>
    )
  } else
    content = (
      <Pressable style={[disabled ? styles.disabledButton : styles.button]} onPress={onPress} disabled={disabled}>
        <LinearGradient colors={['#555555', '#181818']} locations={[0, 1]} start={{ x: 0, y: 0 }} end={{ x: 0, y: 1 }} style={styles.overlay}></LinearGradient>
        <Text style={styles.text}>{title}</Text>
      </Pressable>
    )
  return <View style={[style]}>{content}</View>
}

const styles = StyleSheet.create({
  button: {
    alignContent: 'center',
    display: 'flex',
    justifyContent: 'center',
    borderRadius: 50,
    paddingHorizontal: 16,
    elevation: 3,
    height: 46,
    width: '100%',
    marginBottom: 4,
  },
  disabledButton: {
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 50,
    elevation: 3,
    opacity: 0.5,
    height: 46,
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
