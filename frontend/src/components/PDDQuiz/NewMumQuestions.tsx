/* eslint-disable */
import React from 'react'
import YesOrNo from './YesOrNo'
import { NewMumQuizResults } from '../../models/RiskQuiz/RiskQuizTypes'

type Props = {
  updateIndex: (value: number) => void
  responses: NewMumQuizResults
  updateResponse: (category: any, subcategory: any, value: any) => void
}

export default function NewMumQuestions(props: Props) {
  const { updateIndex, responses, updateResponse } = props

  return <></>
}
