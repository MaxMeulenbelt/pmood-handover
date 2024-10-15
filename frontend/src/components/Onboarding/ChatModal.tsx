import { BlurView } from 'expo-blur'
import React, { useState } from 'react'
import { Modal, TouchableOpacity, Text, TextInput, View, ImageSourcePropType, Image, StyleSheet, Platform, Alert } from 'react-native'
import DateTimePicker, { DateTimePickerEvent } from '@react-native-community/datetimepicker'
import Button from '../reusable/BackgroundButton'

type ChatProps = {
  isVisible: boolean
  setVisible: (visible: boolean) => void
  title: string
  subtitle?: string
  submitModal: (content: any) => void
  type: string
}

const ChatModal = (props: ChatProps) => {
  const { isVisible, setVisible, title, submitModal, type, subtitle } = props
  const [text, setText] = useState('')
  const [date, setDate] = useState<Date>(new Date())
  const [shouldClose, setShouldClose] = useState(true)

  const onChange = (event: DateTimePickerEvent, selectedDate: Date | undefined) => {
    if (event.type === 'set' && selectedDate) {
      const dateWithoutTime = new Date(selectedDate.getFullYear(), selectedDate.getMonth(), selectedDate.getDate())
      setDate(dateWithoutTime)
      setShouldClose(true)
    } else if (event.type === 'dismissed') {
      setShouldClose(true)
    }
  }

  let content = <></>
  if (type === 'text') {
    content = (
      <>
        <Text style={styles.modalTitle}>{title}</Text>
        <TextInput style={styles.modalTextInput} value={text} onChangeText={(value) => setText(value)} />
      </>
    )
  } else if (type === 'date') {
    content = (
      <>
        <Text style={styles.modalTitle}>{title}</Text>
        {subtitle && <Text style={styles.subtitle}>{subtitle}</Text>}
        <DateTimePicker style={styles.datePicker} onChange={onChange} mode="date" value={date} onTouchStart={() => setShouldClose(false)} />
      </>
    )
  }
  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={isVisible}
      onRequestClose={() => {
        setVisible(!isVisible)
      }}
    >
      <TouchableOpacity style={styles.overlay} activeOpacity={1} onPressIn={() => setShouldClose(false)} onPressOut={() => shouldClose && setVisible(false)}>
        <BlurView style={styles.bottomView}>
          {content}
          <Button
            title="Submit"
            onPress={() => {
              if (type === 'text') {
                submitModal(text)
              } else if (type === 'date') {
                submitModal(date)
              }
            }}
          />
        </BlurView>
        <View style={{ ...styles.modalIcon, transform: [{ translateY: -160 }] }}>
          <Image
            style={{ resizeMode: 'contain', height: '100%', width: '100%' }}
            // eslint-disable-next-line @typescript-eslint/no-var-requires
            source={require('frontend/assets/Reusable/rika.png') as ImageSourcePropType}
          />
        </View>
      </TouchableOpacity>
    </Modal>
  )
}

const styles = StyleSheet.create({
  modalTextInput: {
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.9)',
    padding: 10,
    marginVertical: 20,
    borderRadius: 50,
    width: '90%',
    color: 'white',
    fontFamily: Platform.OS === 'ios' ? 'Chalkboard SE' : 'Roboto',
    fontWeight: 'bold',
    fontSize: 18,
    textAlign: 'center',
  },
  datePicker: {
    marginVertical: 20,
    fontSize: 20,
  },
  subtitle: {
    color: 'white',
    textAlign: 'center',
  },
  modalIcon: {
    position: 'absolute',
    backgroundColor: '#E29CDB',
    borderRadius: 60,
    borderColor: 'white',
    borderWidth: 3,
    overflow: 'hidden',
    height: 109,
    width: 109,
    transform: [{ translateY: -160 }],
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 26,
    color: 'white',
    fontFamily: Platform.OS === 'ios' ? 'Chalkboard SE' : 'Roboto',
  },
  bottomView: {
    width: '82%',
    borderRadius: 42,
    overflow: 'hidden',
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    alignItems: 'center',
    top: '-2%',
    borderColor: 'white',
    borderWidth: 1,
    padding: 24,
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    justifyContent: 'center',
    alignItems: 'center',
  },
})

export default ChatModal
