import React, { useEffect, useState } from 'react'
import YesOrNo from './YesOrNo'
import ChatBlock from '../Onboarding/ChatBlock'
import ChatBubble from '../reusable/ChatBubble'
import Button from '../reusable/BackgroundButton'
import ChatModal from '../Onboarding/ChatModal'
/* eslint-disable */

type Props = {
  updateIndex: () => void
  responses: any
  updateResponse: (category: any, subcategory: any, value: any) => void
}

export default function MutualQuestions(props: Props) {
  const { updateIndex, responses, updateResponse } = props
  const [index, setIndex] = useState<number>(0)

  const [psychologicalResponses, setPsychologicalResponses] = useState<string[]>([])
  const [domesticResponses, setDomesticResponses] = useState<string[]>([])
  const [physicalResponses, setPhysicalResponses] = useState<string[]>([])
  const [sexualResponses, setSexualResponses] = useState<string[]>([])
  const [inUKResponses, setInUKResponses] = useState<string[]>([])

  const [isDateOfBirthModalVisible, setDateOfBirthModalVisible] = useState(false)
  const [isCountryModalVisible, setCountryModalVisible] = useState(false)

  const formatDate = (date: Date) => {
    const options: Intl.DateTimeFormatOptions = {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    }
    return date.toLocaleDateString('en-US', options)
  }

  const submitResponses = () => {
    updateResponse('violence', 'psychological', psychologicalResponses)
    updateResponse('violence', 'domestic', domesticResponses)
    updateResponse('violence', 'physical', physicalResponses)
    updateResponse('violence', 'sexual', sexualResponses)

    updateIndex()
  }

  useEffect(() => {
    console.log(psychologicalResponses)
  }, [psychologicalResponses])

  return (
    <>
      {/* Psychological Violence */}
      {index >= 0 && (
        <ChatBlock key={`chatBlock-0`} alignment="left">
          <ChatBubble
            text="Now let's discuss your relationships. In particular I want to talk about experiences of violence because they are important in assessing risk of PPD. Remember, your responses are entirely confidential and anonymous so your data will not be shared with anyone."
            alignment="left"
          />
          <ChatBubble
            text="Firstly, I want to ask about psychological violence. Psychological violence is when someone tries to hurt you emotionally and can be verbal or non-verbal. For example, this can include yelling, screaming or swearing at you as well as insulting, humiliating or threatening you."
            alignment="left"
          />
          <ChatBubble text="Have you ever experienced psychological violence?" alignment="left" />
          {index === 0 && (
            <YesOrNo
              notApplicable={false}
              updateResponse={(value: string) => {
                setPsychologicalResponses((prevResponses) => [...prevResponses, value])
                if (psychologicalResponses[0] && psychologicalResponses[0] === 'Yes') {
                  setIndex(index + 1)
                } else {
                  setIndex(9)
                }
              }}
            />
          )}
        </ChatBlock>
      )}
      {psychologicalResponses[0] && psychologicalResponses[0] === 'Yes' && (
        <>
          {index >= 1 && (
            <ChatBlock key={`chatBlock-1`} alignment="left">
              <ChatBubble text="Have you ever experienced this from an intimate partner?" alignment="left" />
              {index === 1 && (
                <YesOrNo
                  updateResponse={(value: string) => {
                    setPsychologicalResponses((prevResponses: any) => [...prevResponses, value])
                    setIndex(index + 1)
                  }}
                  notApplicable={true}
                />
              )}
            </ChatBlock>
          )}
          {index >= 2 && (
            <ChatBlock key={`chatBlock-2`} alignment="right">
              <ChatBubble text={psychologicalResponses[1]} alignment="right" />
            </ChatBlock>
          )}
          {index >= 3 && (
            <ChatBlock key={`chatBlock-3`} alignment="left">
              <ChatBubble text="Have you ever experienced this from a care giver or family member?" alignment="left" />
              {index === 3 && (
                <YesOrNo
                  updateResponse={(value: string) => {
                    setPsychologicalResponses((prevResponses: any) => [...prevResponses, value])
                    setIndex(index + 1)
                  }}
                  notApplicable={true}
                />
              )}
            </ChatBlock>
          )}
          {index >= 4 && (
            <ChatBlock key={`chatBlock-4`} alignment="right">
              <ChatBubble text={psychologicalResponses[2]} alignment="right" />
            </ChatBlock>
          )}
          {index >= 5 && (
            <ChatBlock key={`chatBlock-5`} alignment="left">
              <ChatBubble text="Did you experience this before your pregnancy?" alignment="left" />
              {index === 5 && (
                <YesOrNo
                  updateResponse={(value: string) => {
                    setPsychologicalResponses((prevResponses: any) => [...prevResponses, value])
                    setIndex(index + 1)
                  }}
                  notApplicable={true}
                />
              )}
            </ChatBlock>
          )}
          {index >= 6 && (
            <ChatBlock key={`chatBlock-6`} alignment="right">
              <ChatBubble text={psychologicalResponses[3]} alignment="right" />
            </ChatBlock>
          )}
          {index >= 7 && (
            <ChatBlock key={`chatBlock-7`} alignment="left">
              <ChatBubble text="Did you experience this during your pregnancy?" alignment="left" />
              {index === 7 && (
                <YesOrNo
                  updateResponse={(value: string) => {
                    setPsychologicalResponses((prevResponses: any) => [...prevResponses, value])
                    setIndex(index + 1)
                  }}
                  notApplicable={true}
                />
              )}
            </ChatBlock>
          )}
          {index >= 8 && (
            <ChatBlock key={`chatBlock-8`} alignment="right">
              <ChatBubble text={psychologicalResponses[4]} alignment="right" />
            </ChatBlock>
          )}
        </>
      )}

      {/* Domestic Violence */}
      {index >= 9 && (
        <ChatBlock key={`chatBlock-9`} alignment="left">
          <ChatBubble
            text="Now I want to ask you about your experiences of domestic violence. Domestic violence is when a partner or carer (over the age of 16) is controlling, coercive or threatening towards you. This can include physical acts of violence as well as more emotional such as restricting your independence or threatening to kick you out."
            alignment="left"
          />
          <ChatBubble text="Have you ever experienced domestic violence?" alignment="left" />
          {index === 9 && (
            <YesOrNo
              notApplicable={false}
              updateResponse={(value: string) => {
                setDomesticResponses((prevResponses) => [...prevResponses, value])
                if (domesticResponses[0] && domesticResponses[0] === 'Yes') {
                  setIndex(index + 1)
                } else {
                  setIndex(18)
                }
              }}
            />
          )}
        </ChatBlock>
      )}
      {domesticResponses[0] && domesticResponses[0] === 'Yes' && (
        <>
          {index >= 10 && (
            <ChatBlock key={`chatBlock-10`} alignment="left">
              <ChatBubble text="Have you ever experienced this from an intimate partner?" alignment="left" />
              {index === 10 && (
                <YesOrNo
                  updateResponse={(value: string) => {
                    setDomesticResponses((prevResponses: any) => [...prevResponses, value])
                    setIndex(index + 1)
                  }}
                  notApplicable={true}
                />
              )}
            </ChatBlock>
          )}
          {index >= 11 && (
            <ChatBlock key={`chatBlock-11`} alignment="right">
              <ChatBubble text={domesticResponses[1]} alignment="right" />
            </ChatBlock>
          )}
          {index >= 12 && (
            <ChatBlock key={`chatBlock-12`} alignment="left">
              <ChatBubble text="Have you ever experienced this from a care giver or family member?" alignment="left" />
              {index === 12 && (
                <YesOrNo
                  updateResponse={(value: string) => {
                    setDomesticResponses((prevResponses: any) => [...prevResponses, value])
                    setIndex(index + 1)
                  }}
                  notApplicable={true}
                />
              )}
            </ChatBlock>
          )}
          {index >= 13 && (
            <ChatBlock key={`chatBlock-13`} alignment="right">
              <ChatBubble text={domesticResponses[2]} alignment="right" />
            </ChatBlock>
          )}
          {index >= 14 && (
            <ChatBlock key={`chatBlock-14`} alignment="left">
              <ChatBubble text="Did you experience this before your pregnancy?" alignment="left" />
              {index === 14 && (
                <YesOrNo
                  updateResponse={(value: string) => {
                    setDomesticResponses((prevResponses: any) => [...prevResponses, value])
                    setIndex(index + 1)
                  }}
                  notApplicable={true}
                />
              )}
            </ChatBlock>
          )}
          {index >= 15 && (
            <ChatBlock key={`chatBlock-15`} alignment="right">
              <ChatBubble text={domesticResponses[3]} alignment="right" />
            </ChatBlock>
          )}
          {index >= 16 && (
            <ChatBlock key={`chatBlock-16`} alignment="left">
              <ChatBubble text="Did you experience this during your pregnancy?" alignment="left" />
              {index === 16 && (
                <YesOrNo
                  updateResponse={(value: string) => {
                    setDomesticResponses((prevResponses: any) => [...prevResponses, value])
                    setIndex(index + 1)
                  }}
                  notApplicable={true}
                />
              )}
            </ChatBlock>
          )}
          {index >= 17 && (
            <ChatBlock key={`chatBlock-17`} alignment="right">
              <ChatBubble text={domesticResponses[4]} alignment="right" />
            </ChatBlock>
          )}
        </>
      )}

      {/* Physical Violence */}
      {index >= 18 && (
        <ChatBlock key={`chatBlock-18`} alignment="left">
          <ChatBubble
            text="I now want to ask about physical violence. Physical violence refers to any unwanted hostile contact which can cause injury or bodily harm. For example, this can include slapping, kicking, punching, choking, pushing, restraining or use of a weapon."
            alignment="left"
          />
          <ChatBubble text="Have you ever experienced physical violence?" alignment="left" />
          {index === 18 && (
            <YesOrNo
              notApplicable={false}
              updateResponse={(value: string) => {
                setPhysicalResponses((prevResponses) => [...prevResponses, value])
                if (physicalResponses[0] && physicalResponses[0] === 'Yes') {
                  setIndex(index + 1)
                } else {
                  setIndex(18)
                }
              }}
            />
          )}
        </ChatBlock>
      )}
      {physicalResponses[0] && physicalResponses[0] === 'Yes' && (
        <>
          {index >= 19 && (
            <ChatBlock key={`chatBlock-19`} alignment="left">
              <ChatBubble text="Have you ever experienced this from an intimate partner?" alignment="left" />
              {index === 19 && (
                <YesOrNo
                  updateResponse={(value: string) => {
                    setPhysicalResponses((prevResponses: any) => [...prevResponses, value])
                    setIndex(index + 1)
                  }}
                  notApplicable={true}
                />
              )}
            </ChatBlock>
          )}
          {index >= 20 && (
            <ChatBlock key={`chatBlock-20`} alignment="right">
              <ChatBubble text={physicalResponses[1]} alignment="right" />
            </ChatBlock>
          )}
          {index >= 21 && (
            <ChatBlock key={`chatBlock-21`} alignment="left">
              <ChatBubble text="Have you ever experienced this from a care giver or family member?" alignment="left" />
              {index === 21 && (
                <YesOrNo
                  updateResponse={(value: string) => {
                    setPhysicalResponses((prevResponses: any) => [...prevResponses, value])
                    setIndex(index + 1)
                  }}
                  notApplicable={true}
                />
              )}
            </ChatBlock>
          )}
          {index >= 22 && (
            <ChatBlock key={`chatBlock-22`} alignment="right">
              <ChatBubble text={physicalResponses[2]} alignment="right" />
            </ChatBlock>
          )}
          {index >= 23 && (
            <ChatBlock key={`chatBlock-23`} alignment="left">
              <ChatBubble text="Did you experience this before your pregnancy?" alignment="left" />
              {index === 23 && (
                <YesOrNo
                  updateResponse={(value: string) => {
                    setPhysicalResponses((prevResponses: any) => [...prevResponses, value])
                    setIndex(index + 1)
                  }}
                  notApplicable={true}
                />
              )}
            </ChatBlock>
          )}
          {index >= 24 && (
            <ChatBlock key={`chatBlock-24`} alignment="right">
              <ChatBubble text={physicalResponses[3]} alignment="right" />
            </ChatBlock>
          )}
          {index >= 25 && (
            <ChatBlock key={`chatBlock-25`} alignment="left">
              <ChatBubble text="Did you experience this during your pregnancy?" alignment="left" />
              {index === 25 && (
                <YesOrNo
                  updateResponse={(value: string) => {
                    setPhysicalResponses((prevResponses: any) => [...prevResponses, value])
                    setIndex(index + 1)
                  }}
                  notApplicable={true}
                />
              )}
            </ChatBlock>
          )}
          {index >= 26 && (
            <ChatBlock key={`chatBlock-26`} alignment="right">
              <ChatBubble text={physicalResponses[4]} alignment="right" />
            </ChatBlock>
          )}
        </>
      )}

      {/* Sexual Violence */}
      {index >= 27 && (
        <ChatBlock key={`chatBlock-18`} alignment="left">
          <ChatBubble
            text="Finally, I want to discuss sexual violence. Sexual violence refers to a sexual experience which you did not give consent to or were pressured into. This can include kissing, fondling, petting, sexual intercourse or other sex acts."
            alignment="left"
          />
          <ChatBubble text="Have you ever experienced sexual violence?" alignment="left" />
          {index === 27 && (
            <YesOrNo
              notApplicable={false}
              updateResponse={(value: string) => {
                setSexualResponses((prevResponses) => [...prevResponses, value])
                if (sexualResponses[0] === 'Yes') {
                  setIndex(index + 1)
                } else {
                  setIndex(36)
                }
              }}
            />
          )}
        </ChatBlock>
      )}
      {sexualResponses[0] === 'Yes' && (
        <>
          {index >= 28 && (
            <ChatBlock key={`chatBlock-28`} alignment="left">
              <ChatBubble text="Have you ever experienced this from an intimate partner?" alignment="left" />
              {index === 28 && (
                <YesOrNo
                  updateResponse={(value: string) => {
                    setSexualResponses((prevResponses: any) => [...prevResponses, value])
                    setIndex(index + 1)
                  }}
                  notApplicable={true}
                />
              )}
            </ChatBlock>
          )}
          {index >= 29 && (
            <ChatBlock key={`chatBlock-29`} alignment="right">
              <ChatBubble text={sexualResponses[1]} alignment="right" />
            </ChatBlock>
          )}
          {index >= 30 && (
            <ChatBlock key={`chatBlock-30`} alignment="left">
              <ChatBubble text="Have you ever experienced this from a care giver or family member?" alignment="left" />
              {index === 30 && (
                <YesOrNo
                  updateResponse={(value: string) => {
                    setSexualResponses((prevResponses: any) => [...prevResponses, value])
                    setIndex(index + 1)
                  }}
                  notApplicable={true}
                />
              )}
            </ChatBlock>
          )}
          {index >= 31 && (
            <ChatBlock key={`chatBlock-31`} alignment="right">
              <ChatBubble text={sexualResponses[2]} alignment="right" />
            </ChatBlock>
          )}
          {index >= 32 && (
            <ChatBlock key={`chatBlock-32`} alignment="left">
              <ChatBubble text="Did you experience this before your pregnancy?" alignment="left" />
              {index === 32 && (
                <YesOrNo
                  updateResponse={(value: string) => {
                    setSexualResponses((prevResponses: any) => [...prevResponses, value])
                    setIndex(index + 1)
                  }}
                  notApplicable={true}
                />
              )}
            </ChatBlock>
          )}
          {index >= 33 && (
            <ChatBlock key={`chatBlock-33`} alignment="right">
              <ChatBubble text={sexualResponses[3]} alignment="right" />
            </ChatBlock>
          )}
          {index >= 34 && (
            <ChatBlock key={`chatBlock-34`} alignment="left">
              <ChatBubble text="Did you experience this during your pregnancy?" alignment="left" />
              {index === 34 && (
                <YesOrNo
                  updateResponse={(value: string) => {
                    setSexualResponses((prevResponses: any) => [...prevResponses, value])
                    setIndex(index + 1)
                  }}
                  notApplicable={true}
                />
              )}
            </ChatBlock>
          )}
          {index >= 35 && (
            <ChatBlock key={`chatBlock-35`} alignment="right">
              <ChatBubble text={sexualResponses[4]} alignment="right" />
            </ChatBlock>
          )}
        </>
      )}

      {/* Demographics */}
      {index >= 36 && (
        <ChatBlock key={`chatBlock-36`} alignment="left">
          <ChatBubble
            text={`We're now onto the final section of the questionnaire. I would like you know a bit more about who you are. Remember, your answers are confidential and will not be used to identify you.`}
            alignment="left"
          />
          <ChatBubble text={`What is your date of birth?`} alignment="left" />
          {index === 36 && <Button onPress={() => setDateOfBirthModalVisible(true)} title={'Select date of birth'}></Button>}
          <ChatModal
            isVisible={isDateOfBirthModalVisible}
            setVisible={setDateOfBirthModalVisible}
            title={'Select date of birth:'}
            submitModal={(value: any) => {
              updateResponse('demographics', 'date_of_birth', formatDate(value))
              setDateOfBirthModalVisible(false)
              setIndex(index + 1)
            }}
            type={'date'}
          />
        </ChatBlock>
      )}
      {index >= 37 && (
        <ChatBlock key={`chatBlock-37-right`} alignment="right">
          <ChatBubble text={`${responses.demographics.date_of_birth}`} alignment="right" />
        </ChatBlock>
      )}
      {index >= 38 && (
        <ChatBlock key={`chatBlock-38`} alignment="left">
          <ChatBubble text={`What is your ethnicity?`} alignment="left" />
          {index === 38 && (
            <>
              <Button title="Asian or Asian British" onPress={() => updateResponse('demographics', 'ethnicity', 'Asian or Asian British')} />
              <Button title="Black, Black British, Caribbean" onPress={() => updateResponse('demographics', 'ethnicity', 'Black, Black British, Caribbean')} />
              <Button title="Mixed or multiple ethnic groups" onPress={() => updateResponse('demographics', 'ethnicity', 'Mixed or multiple ethnic groups')} />
              <Button title="White" onPress={() => updateResponse('demographics', 'ethnicity', 'White')} />
              <Button title="Other ethnic group" onPress={() => updateResponse('demographics', 'ethnicity', 'Other ethnic group')} />
              <Button title="Prefer not to say" onPress={() => updateResponse('demographics', 'ethnicity', 'Prefer not to say')} />
            </>
          )}
        </ChatBlock>
      )}
      {index >= 39 && (
        <ChatBlock key={`chatBlock-39-right`} alignment="right">
          <ChatBubble text={`${responses.demographics.ethnicity}`} alignment="right" />
        </ChatBlock>
      )}
    </>
  )
}
