import React, { useRef, useState, memo, useEffect, useContext } from 'react'
import { StyleSheet, View, ScrollView, Animated, Easing, Button } from 'react-native'
import Tile from './Tile'
import { SlotsContext } from '../../lib/slotMachine'

const visibleTiles = 3
const totalTiles = 100
const data = new Array(totalTiles).fill(0).map((_, index) => ({ id: index }))

type SpinProps = {
  spinning: boolean
  startingTile: number
}

function SpinReel(props: SpinProps) {
  const { spinning, startingTile } = props
  const context = useContext(SlotsContext)

  const scrollViewRef = useRef<ScrollView | null>(null)

  const scrollAnim = useRef(new Animated.Value(0)).current

  const scrollToIndex = (index: number) => {
    if (scrollViewRef.current) {
      const distance = index * 120
      const duration = 3000
      Animated.timing(scrollAnim, {
        toValue: distance,
        duration,
        easing: Easing.bezier(0.3, 0.16, 0.23, 1.02),
        useNativeDriver: false,
      }).start()
    }
  }

  useEffect(() => {
    const listenerId = scrollAnim.addListener(({ value }) => {
      scrollViewRef.current?.scrollTo({ y: value, animated: false })
    })

    return () => {
      scrollAnim.removeListener(listenerId)
    }
  }, [scrollAnim])

  const iconList = () => {
    return (
      <ScrollView style={styles.scrollView} ref={scrollViewRef} showsVerticalScrollIndicator={false} scrollEnabled={false} contentContainerStyle={styles.scrollViewContent}>
        {data.map((item) => (
          <Tile key={item.id} id={(item.id + startingTile) % 6} />
        ))}
      </ScrollView>
    )
  }

  function generateRandom(min: number, max: number) {
    const difference = max - min
    let rand = Math.random()
    rand = Math.floor(rand * difference)
    rand = rand + min
    return rand
  }

  useEffect(() => {
    if (spinning && context) {
      const fairRandom = generateRandom(0, 5)
      context.endIcon = (89 + fairRandom + startingTile) % 6

      if (context.fairGamesCount > 0) {
        context.fairGamesCount -= 1
        scrollToIndex(88 + fairRandom)
      } else {
        if (context.endIcon === context.selectIcon) {
          const unfairRandom = generateRandom(-3, 3)
          context.endIcon = (89 + fairRandom + startingTile + unfairRandom) % 6
          scrollToIndex(88 + fairRandom + unfairRandom)
        } else {
          scrollToIndex(88 + fairRandom)
        }
      }
    }
  })
  return <View style={styles.scrollViewContainer}>{iconList()}</View>
}

const styles = StyleSheet.create({
  scrollViewContainer: {
    alignItems: 'center',
    alignSelf: 'center',
    overflow: 'hidden',
    height: 120 * visibleTiles,
  },
  scrollView: {
    overflow: 'hidden',
    height: 120 * visibleTiles,
  },
  scrollViewContent: {
    alignItems: 'center',
  },
})

export default memo(SpinReel)
