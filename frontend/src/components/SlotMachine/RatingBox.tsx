import React, { Component } from 'react'
import { Dimensions, StyleSheet, Text, View } from 'react-native'
import { Slider } from '@miblanchard/react-native-slider'
import BackgroundButton from '../reusable/BackgroundButton'

type Props = {
  text: string
  onSubmit: (arg0: any) => void
}
type State = {
  value: number | number[]
  selected: number
}

export default class RatingBox extends Component<Props, State> {
  windowWidth: number
  windowHeight: number

  constructor(props: Props) {
    super(props)
    this.state = {
      value: [0],
      selected: 0,
    }
    this.windowWidth = Dimensions.get('window').width
    this.windowHeight = Dimensions.get('window').height
  }

  render() {
    return (
      <View style={{ width: '100%', alignItems: 'center', height: '100%' }}>
        <View style={styles.ratingBox}>
          <View style={{ flexGrow: 1 }}>
            <Text style={{ color: 'white', fontSize: 16, textAlign: 'center' }}>{this.props.text}</Text>
          </View>
          <View style={styles.sliderContainer}>
            <Slider
              value={this.state.value}
              minimumValue={-1}
              maximumValue={1}
              onValueChange={(value) => {
                this.setState({ value })
              }}
              minimumTrackTintColor="white"
              thumbStyle={styles.thumb}
              trackStyle={styles.track}
            />
          </View>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <Text style={{ color: 'white', fontSize: 14 }}>Not at all</Text>
            <Text style={{ color: 'white', fontSize: 14 }}>A lot</Text>
          </View>
        </View>
        <BackgroundButton
          style={styles.continueButton}
          onPress={() => {
            this.props.onSubmit(this.state.value)
            this.setState({ value: [0] })
          }}
          title="Continue"
        />
        {/* <View style={{ alignItems: 'center', width:'100%' }}>
        </View> */}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  ratingBox: {
    padding: '6%',
    paddingTop: '8%',
    justifyContent: 'center',
    width: '90%',
    height: '115%',
    borderWidth: 1,
    borderColor: 'white',
    borderRadius: 32,
    backgroundColor: 'rgba(205,161,138, 1)',
    marginTop: '-25%',
    position: 'absolute',
  },
  sliderContainer: {
    // marginTop: '5%',
    marginHorizontal: '5%',
    justifyContent: 'center',
    color: 'white',
  },
  thumb: {
    backgroundColor: '#80617F',
    borderColor: 'white',
    borderRadius: 10,
    borderWidth: 1,
    height: 32,
    width: 24,
  },
  track: {
    backgroundColor: 'rgba(0,0,0,0)',
    borderColor: 'white',
    borderRadius: 50,
    borderWidth: 1,
    height: 16,
  },
  continueButton: {
    borderRadius: 50,
    height: 46,
    alignSelf: 'center',
    width: '60%',
    position: 'absolute',
    marginTop: '27%',
  },
})
