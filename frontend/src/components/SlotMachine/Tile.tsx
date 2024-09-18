import React, { memo } from 'react'
import { StyleSheet, View, Image } from 'react-native'
import icons from '../../lib/icons'
type Props = {
  id: number
}

export function Tile(props: Props) {
  const { id } = props

  const getIcon = () => {
    switch (id) {
      case 0:
        return icons.icons.apple
      case 1:
        return icons.icons.mango
      case 2:
        return icons.icons.ava
      case 3:
        return icons.icons.berry
      case 4:
        return icons.icons.ban
      case 5:
        return icons.icons.strawb
      default:
        throw new Error('Invalid id')
    }
  }

  /* eslint-disable @typescript-eslint/no-unsafe-assignment */
  return (
    <View>
      <Image style={styles.image} source={getIcon()} />
    </View>
  )
}

const styles = StyleSheet.create({
  image: {
    resizeMode: 'contain',
    width: 120,
    height: 120,
    transform: [{ scale: 0.8 }],
  },
})

export default memo(Tile)
