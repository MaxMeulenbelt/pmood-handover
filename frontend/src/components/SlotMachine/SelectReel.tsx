import React, { memo, useContext, useRef } from 'react'
import { StyleSheet, Animated, SafeAreaView, NativeScrollEvent, NativeSyntheticEvent, View } from 'react-native'
import Tile from './Tile'
import { SlotsContext } from '../../lib/slotMachine'

const visibleTiles = 3
const totalTiles = 16
const data = new Array(totalTiles).fill(0).map((_, index) => ({ id: index }))

function SelectReel() {
  const context = useContext(SlotsContext)
  const offsetY = useRef(new Animated.Value(0)).current

  let currentIcon = 0
  const listRef = useRef<any>(null)
  const startingTile = Math.floor(Math.random() * 6)

  const getItemLayout = (newData: any, index: number) => ({ length: 120, offset: 120 * index, index })

  const renderItem = ({ item }: { item: { id: number } }) => {
    return <Tile key={item.id} id={(item.id + startingTile) % 6} />
  }

  const handleScroll = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
    const y = e.nativeEvent.contentOffset.y
    currentIcon = Math.round((y / 120 + startingTile + 1) % 6)
    if (currentIcon !== 6 && context) {
      context.selectIcon = currentIcon
    }
  }

  return (
    <View style={styles.container}>
      <Animated.FlatList
        key={Math.random()}
        ref={listRef}
        disableIntervalMomentum={true}
        snapToInterval={120}
        showsVerticalScrollIndicator={false}
        data={data}
        renderItem={renderItem}
        getItemLayout={getItemLayout}
        initialScrollIndex={6}
        scrollEventThrottle={16}
        onScroll={Animated.event(
          [
            {
              nativeEvent: {
                contentOffset: {
                  y: offsetY,
                },
              },
            },
          ],
          {
            useNativeDriver: true,
            listener: (event: NativeSyntheticEvent<NativeScrollEvent>) => {
              handleScroll(event)
            },
          }
        )}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    // overflow:'hidden',
    height: 120 * visibleTiles,
    alignItems: 'center',
    alignSelf: 'center',
  },
})

export default memo(SelectReel)
