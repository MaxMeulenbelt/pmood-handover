import { Avatar } from '@react-native-material/core'
import React from 'react'
import { Pressable, View, StyleSheet, ImageSourcePropType, Image, Text, Platform } from 'react-native'
import navigation from '../../lib/navigation'
import { Octicons } from '@expo/vector-icons'
import Button from '../reusable/BackgroundButton'

const Header = () => {
  return (
    <View style={styles.header}>
      <View style={styles.background}></View>
      <View style={styles.row}>
        <Pressable onPress={() => navigation.navigate('Settings', {})}>
          <Octicons name="three-bars" size={26} color="#fff" />
        </Pressable>

        <Pressable onPress={() => navigation.navigate('Settings', {})}>
          <Avatar
            // eslint-disable-next-line @typescript-eslint/no-var-requires
            image={require('frontend/assets/Reusable/iOS/profile.png') as ImageSourcePropType}
            style={styles.profile}
            size={60}
          />
        </Pressable>
      </View>
      <View style={styles.panas}>
        {/* eslint-disable @typescript-eslint/no-var-requires */}
        <Image
          style={{ transform: [{ scale: 1.2 }, { translateY: 0 }], height: 90, width: 90 }}
          source={require('frontend/assets/GameThumbnails/iOS/read-your-mood.png') as ImageSourcePropType}
        />
        <View>
          <Text style={styles.text}>Track your mood</Text>
          <Text style={styles.smallText}>How do you feel right now?</Text>
        </View>
        <Button title="Track" style={{ width: 90 }} onPress={() => navigation.navigate('PanasTask')}></Button>
      </View>
    </View>
  )
}

export default Header

const styles = StyleSheet.create({
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: 'white',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    opacity: 1,
  },
  text: {
    fontSize: 17,
    fontWeight: '700',
    color: '#613B6A',
    fontFamily: Platform.OS === 'ios' ? 'Chalkboard SE' : 'Roboto',
  },
  smallText: {
    color: '#613B6A',
    opacity: 0.7,
    fontSize: 13,
  },
  row: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 48,
    marginHorizontal: 24,
  },
  panas: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginRight: 20,
    gap: 8,
    alignItems: 'center',
  },
  profile: {
    backgroundColor: 'rgba(225, 220, 220, 0.3)',
    borderColor: 'white',
    borderWidth: 1,
  },
  header: {
    height: 200,
  },
  background: {
    width: '100%',
    height: '100%',
    position: 'absolute',
    backgroundColor: '#f5f5f5',
    opacity: 0.3,
  },
})
