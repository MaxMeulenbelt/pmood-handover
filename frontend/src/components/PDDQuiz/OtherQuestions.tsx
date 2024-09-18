/* eslint-disable */
import React, { useState } from 'react'
import YesOrNo from './YesOrNo'
import { OtherQuizResults } from '../../models/RiskQuiz/RiskQuizTypes'
import ChatBlock from '../Onboarding/ChatBlock'
import ChatBubble from '../reusable/ChatBubble'
import Button from '../reusable/BackgroundButton'

type Props = {
  updateIndex: (value: number) => void
  responses: OtherQuizResults
  updateResponse: (category: any, subcategory: any, value: any) => void
}

export default function OtherQuestions(props: Props) {
  const { updateIndex, responses, updateResponse } = props
  const [index, setIndex] = useState<number>(0)

  return (
    <>
      <ChatBlock key={`chatBlock-0`} alignment="left">
        <ChatBubble text="Is this your first pregnancy ?" alignment="left" />
        {/* <YesOrNo updateResponse={updateResponse}></YesOrNo> */}
      </ChatBlock>
    </>
  )
}
