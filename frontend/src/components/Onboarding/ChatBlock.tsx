/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import React, { useEffect, useState, ReactNode, useRef } from 'react'
import { View, Image, ImageSourcePropType, StyleSheet } from 'react-native'
import { Animated } from 'react-native'
import { InteractionManager } from 'react-native'

export interface ChatBlockProps {
  children: ReactNode | ReactNode[]
  alignment: string
}

const ChatBlock: React.FC<ChatBlockProps> = ({ children, alignment }) => {
  const childrenArray = React.Children.toArray(children)
  const animatedValues = childrenArray.map(() => new Animated.Value(0)) // Create an Animated.Value for each child

  useEffect(() => {
    Animated.stagger(
      1600,
      animatedValues.map((val) => {
        return Animated.spring(val, {
          toValue: 1,
          friction: 8,
          tension: 20,
          useNativeDriver: true,
        })
      })
    ).start()
  }, [])

  let content = <View />
  if (alignment === 'left') {
    content = (
      <>
        <View style={{ backgroundColor: '#E29CDB', borderRadius: 50, borderColor: 'white', borderWidth: 2, overflow: 'hidden', height: 46, width: 46 }}>
          <Image style={{ resizeMode: 'center', height: '100%', width: '100%' }} source={require('frontend/assets/Reusable/rika.png')} />
        </View>
        <View style={styles.chatSequence}>
          {childrenArray.map((child, index) => (
            <Animated.View key={index} style={{ transform: [{ scale: animatedValues[index] }] }}>
              {child}
            </Animated.View>
          ))}
        </View>
      </>
    )
  } else if (alignment === 'right') {
    content = (
      <>
        <View style={styles.chatSequence}>
          {childrenArray.map((child, index) => (
            <Animated.View key={index} style={{ transform: [{ scale: animatedValues[index] }] }}>
              {child}
            </Animated.View>
          ))}
        </View>
        <View style={{ backgroundColor: '#E29CDB', borderRadius: 50, overflow: 'hidden', height: 46, width: 46 }}>
          <Image style={{ resizeMode: 'center', height: '100%', width: '100%' }} source={require('frontend/assets/Reusable/Group122.png')} />
        </View>
      </>
    )
  }

  return <View style={{ flexDirection: 'row', columnGap: 10, marginVertical: 12, justifyContent: alignment === 'left' ? 'flex-start' : 'flex-end' }}>{content}</View>
}

const styles = StyleSheet.create({
  chatSequence: {
    rowGap: 8,
    maxWidth: '75%',
  },
})

export default ChatBlock
