/* eslint-disable */
import React from 'react'
import { ImageSourcePropType, StyleSheet, Text, View, ScrollView, Alert, Platform } from 'react-native'
import RootStackParamList from '../../models/RootStackParamList'
import navigation, { NavigationContext } from '../../lib/navigation'
import { BlurView } from 'expo-blur'
import api from '../../lib/api'
import ScreenWrapper from '../ScreenWrapper'
import Button from '../reusable/BackgroundButton'
import { ReactNode, memo, useContext, useEffect, useRef, useState } from 'react'
import ChatBubble from '../reusable/ChatBubble'
import ChatModal from '../Onboarding/ChatModal'
import ChatBlock from '../Onboarding/ChatBlock'
import {
  PregnantQuizResults,
  PregnantCategory,
  PregnantSubcategory,
  OtherQuizResults,
  OtherCategory,
  OtherSubcategory,
  NewMumQuizResults,
  NewMumCategory,
  NewMumSubcategory,
} from '../../models/RiskQuiz/RiskQuizTypes'
import PregnantQuestions from './PregnantQuestions'
import NewMumQuestions from './NewMumQuestions'
import OtherQuestions from './OtherQuestions'
import MutualQuestions from './MutualQuestions'
import TaskHeader from '../reusable/TaskHeader'

const newMutualProperties = {
  violence: {
    psychological: [],
    domestic: [],
    physical: [],
    sexual: [],
  },
  demographics: {
    date_of_birth: '',
    ethnicity: '',
    immigration_status: '',
    residency: '',
    immigration_reason: '',
    marriage_status: '',
    employment_status: '',
    education: '',
    income: '',
    expenses: '',
  },
}
const pregnancyMutualProperties = {
  ...newMutualProperties,
  health: {
    height_weight_before: '',
    perinatal_anaemia: '',
    gestational_diabetes: '',
    smoking: '',
  },
  mental_wellbeing: {
    premenstual_syndrome: [],
    mental_disorders: [],
    anxiety: [],
  },
}

export default function PDDQuiz() {
  const scrollViewRef = useRef<ScrollView>(null)
  const [quizIndex, setQuizIndex] = useState(0)
  const [quizType, setQuizType] = useState<string>('')
  const [pregnantResponse, setPregnantResponse] = useState<PregnantQuizResults>({
    pregnancy_status: {
      first_pregnancy: '',
      due_date: '',
    },
    ...pregnancyMutualProperties,
  })
  const [newMumResponse, setNewMumResponse] = useState<NewMumQuizResults>({
    birth: {
      caesarean_section: '',
      preterm_birth: '',
      unintended_pregnancy: '',
    },
    ...pregnancyMutualProperties,
  })
  const [otherResponse, setOtherResponse] = useState<OtherQuizResults>({
    health: {
      smoking: '',
      premenstual_syndrome: '',
      mental_disorders: '',
      anxiety: [],
    },
    ...newMutualProperties,
  })

  const updatePregantResponses = (category: PregnantCategory, subcategory: PregnantSubcategory, value: any) => {
    setPregnantResponse((prevState) => {
      return {
        ...prevState,
        [category]: {
          ...prevState[category],
          [subcategory]: value,
        },
      }
    })
  }
  const updateNewMumResponses = (category: NewMumCategory, subcategory: NewMumSubcategory, value: any) => {
    setNewMumResponse((prevState) => {
      return {
        ...prevState,
        [category]: {
          ...prevState[category],
          [subcategory]: value,
        },
      }
    })
  }
  const updateOtherResponses = (category: OtherCategory, subcategory: OtherSubcategory, value: any) => {
    setOtherResponse((prevState) => {
      return {
        ...prevState,
        [category]: {
          ...prevState[category],
          [subcategory]: value,
        },
      }
    })
  }

  const updateIndex = () => {
    setQuizIndex(quizIndex + 1)
  }

  let variableContent = <></>
  switch (quizType) {
    case 'pregnant':
      variableContent = <PregnantQuestions updateIndex={updateIndex} responses={pregnantResponse} updateResponse={updatePregantResponses} />
      break
    case 'newMum':
      variableContent = <NewMumQuestions updateIndex={updateIndex} responses={newMumResponse} updateResponse={updateNewMumResponses} />
      break
    case 'other':
      variableContent = <OtherQuestions updateIndex={updateIndex} responses={otherResponse} updateResponse={updateOtherResponses} />
      break
  }
  return (
    <ScreenWrapper>
      <TaskHeader
        title={'Risk Questionnaire'}
        iconType={'close'}
        backNav={() => {
          navigation.navigate('TaskSelection')
        }}
      />
      <ScrollView style={styles.chatContainer} ref={scrollViewRef}>
        {quizIndex >= 0 && (
          <ChatBlock key={`chatBlock-1-left`} alignment="left">
            <ChatBubble
              text="Hi, to get to know you better I'm going to ask you some questions designed to assess your risk of postnatal depression. Let's get started!"
              alignment="left"
            />
            <ChatBubble text="What is your pregnancy status?" alignment="left" />
            {quizIndex === 0 && (
              <>
                <Button
                  title={'Pregnant'}
                  onPress={() => {
                    setQuizType('pregnant')
                    updateIndex()
                  }}
                />
                <Button
                  title={'New mum'}
                  onPress={() => {
                    setQuizType('newMum')
                    updateIndex()
                  }}
                />
                <Button
                  title={'Other'}
                  onPress={() => {
                    setQuizType('other')
                    updateIndex()
                  }}
                />
              </>
            )}
          </ChatBlock>
        )}
        {quizIndex >= 1 && (
          <MutualQuestions
            updateIndex={updateIndex}
            responses={quizType === 'pregnant' ? pregnantResponse : quizType === 'newMum' ? newMumResponse : otherResponse}
            updateResponse={quizType === 'pregnant' ? updatePregantResponses : quizType === 'newMum' ? updateNewMumResponses : updateOtherResponses}
          />
        )}
        {/* {quizIndex >= 1 && variableContent}
        {quizIndex >= 2 && (
          <MutualQuestions
            updateIndex={updateIndex}
            responses={quizType === 'pregnant' ? pregnantResponse : quizType === 'newMum' ? newMumResponse : otherResponse}
            updateResponse={quizType === 'pregnant' ? updatePregantResponses : quizType === 'newMum' ? updateNewMumResponses : updateOtherResponses}
          />
        )} */}
        <View style={{ marginTop: 60 }}></View>
      </ScrollView>
    </ScreenWrapper>
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
    fontFamily: Platform.OS === 'ios' ? 'Chalkboard SE' : 'Arial',
    fontWeight: 'bold',
    fontSize: 18,
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
  chatContainer: {
    paddingHorizontal: '3%',
    overflow: 'hidden',
    marginTop: 5,
    flex: 1,
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 22,
    fontFamily: Platform.OS === 'ios' ? 'Chalkboard SE' : 'Arial',
    color: 'white',
    alignSelf: 'center',
    marginBottom: 30,
  },
  bottomView: {
    width: '82%',
    // height:'30%',
    borderRadius: 42,
    overflow: 'hidden',
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    alignItems: 'center',
    // alignSelf: 'center',
    // position: 'absolute',
    top: '-2%',
    borderColor: 'white',
    borderWidth: 1,
    padding: 24,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 26,
    color: 'white',
    fontFamily: Platform.OS === 'ios' ? 'Chalkboard SE' : 'Arial',
  },
})
