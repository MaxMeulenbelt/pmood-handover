import React from 'react'
import { Dimensions, Text, View } from 'react-native'
import BackgroundButton from '../reusable/BackgroundButton'

const windowWidth = Dimensions.get('window').width

type Props = {
  onSubmit: () => void
}

export default function Reminder(props: Props) {
  const { onSubmit } = props

  return (
    <View>
      <View
        style={{
          height: 104,
          padding: 10,
          justifyContent: 'center',
          width: windowWidth - 20,
          margin: 16,
          borderWidth: 3,
          borderColor: '#F2ff1b',
          borderRadius: 5,
          backgroundColor: '#fcffd1',
        }}
      >
        <View style={{ alignItems: 'center' }}>
          <Text>Please don't forget to make a choice</Text>
        </View>
      </View>
      <View style={{ justifyContent: 'center', alignItems: 'center' }}>
        <BackgroundButton
          onPress={() => {
            onSubmit()
          }}
          title="Continue"
        />
      </View>
    </View>
  )
}
