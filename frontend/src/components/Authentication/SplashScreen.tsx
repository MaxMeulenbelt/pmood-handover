import React, { Component } from 'react'
import { StyleSheet, Image, View, ImageSourcePropType } from 'react-native'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import RootStackParamList from '../../models/RootStackParamList'

type Props = NativeStackScreenProps<RootStackParamList, 'SplashScreen'>
type State = Record<string, unknown>

/**
 * A splash screen to display when the authentication state is being determined.
 *
 * @prop navigation The navigation object.
 */
export default class SplashScreen extends Component<Props, State> {
  render() {
    return (
      <View style={styles.container}>
        {/* eslint-disable @typescript-eslint/no-var-requires */}
        <Image source={require('../../../assets/icon.png') as ImageSourcePropType} style={styles.logo} />
        {/* eslint-enable @typescript-eslint/no-var-requires */}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    width: '60%',
    height: '60%',
    resizeMode: 'contain',
  },
})
