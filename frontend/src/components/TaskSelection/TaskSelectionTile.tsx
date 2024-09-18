import { BlurView } from 'expo-blur'
import React from 'react'
import { StyleSheet, Text, Pressable, ImageSourcePropType, View, Image, Platform } from 'react-native'

type Props = {
  name: string
  onPress: () => void
  disabled?: boolean
  icon: ImageSourcePropType
  shape: string
  description: string
  imageProps: {
    scale: number
    offsetX: number
    offsetY: number
  }
}

/**
 * A single row in the task selection screen.
 *
 * @prop name The name of the task.
 * @prop onPress The function to call when the row is pressed.
 * @prop disabled Whether the row is disabled, optional.
 */
export default function TaskSelectionTile(props: Props) {
  /* eslint-disable @typescript-eslint/no-unsafe-assignment */
  const { name, onPress, disabled, icon, shape, description, imageProps } = props
  let content = <View></View>
  if (shape === 'tall') {
    content = (
      <View style={{ flex: 1, alignContent: 'center', justifyContent: 'space-between', paddingTop: 8 }}>
        <View>
          <Text style={[styles.text, { textAlign: 'center' }]}>{name}</Text>
          <View style={styles.descriptionBox}>
            <Text style={{ color: 'white', textAlign: 'center', fontSize: 13 }}>{description}</Text>
          </View>
        </View>
      </View>
    )
  } else {
    content = (
      <View style={{ width: '100%', display: 'flex', flexDirection: 'row', justifyContent: 'space-between', paddingTop: 8 }}>
        <View style={{ maxWidth: '55%' }}>
          <Text style={styles.text}>{name}</Text>
          <View style={styles.descriptionBox}>
            <Text style={{ color: 'white', fontSize: 13 }}>{description}</Text>
          </View>
        </View>
      </View>
    )
  }

  return (
    <View style={[shape === 'tall' ? styles.tall_wrapper : styles.wide_wrapper]}>
      <BlurView intensity={20} style={[shape === 'tall' ? styles.tall_container : styles.wide_container]}>
        {content}
      </BlurView>
      <Image
        style={{
          resizeMode: 'contain',
          position: 'absolute',
          transform: [{ scale: imageProps.scale }, { translateX: imageProps.offsetX }, { translateY: imageProps.offsetY }],
        }}
        source={icon}
      />
      <View style={{ display: 'flex', justifyContent: 'flex-end', maxHeight: '100%' }}>
        <Pressable onPress={onPress} style={[{ display: 'flex', position: 'absolute', alignSelf: 'flex-end' }, shape === 'tall' ? { margin: '10%' } : { margin: '3%' }]}>
          <Image source={require('frontend/assets/Reusable/iOS/play.png')} style={{ transform: [{ scale: 1.15 }] }} />
        </Pressable>
      </View>
    </View>
  )
  // render() {

  // }
}

const styles = StyleSheet.create({
  tall_wrapper: {
    width: '47%',
  },
  wide_wrapper: {
    width: '100%',
  },
  tall_container: {
    flex: 1,
    height: 280,
    padding: 10,
    borderColor: 'white',
    borderWidth: 1,
    borderRadius: 32,
    overflow: 'hidden',
    backgroundColor: 'rgba(225, 220, 220, 0.2)',
  },
  wide_container: {
    flex: 1,
    height: 150,
    padding: 16,
    borderColor: 'white',
    borderWidth: 1,
    borderRadius: 32,
    overflow: 'hidden',
    backgroundColor: 'rgba(225, 220, 220, 0.2)',
  },
  text: {
    fontSize: 18,
    fontWeight: '700',
    color: '#613B6A',
    fontFamily: Platform.OS === 'ios' ? 'Chalkboard SE' : 'Arial',
  },
  descriptionBox: {
    marginVertical: 12,
    justifySelf: 'center',
  },
})
