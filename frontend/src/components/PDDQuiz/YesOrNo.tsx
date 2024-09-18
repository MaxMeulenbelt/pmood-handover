/* eslint-disable */
import React from 'react'
import Button from '../reusable/BackgroundButton'

type Props = {
  updateResponse: (value: any) => void
  notApplicable: boolean
}
export default function yesOrNoButtons(props: Props) {
  const { updateResponse, notApplicable } = props
  return (
    <>
      <Button
        title={'Yes'}
        onPress={() => {
          updateResponse('Yes')
        }}
      />
      <Button
        title={'No'}
        onPress={() => {
          updateResponse('No')
        }}
      />
      {notApplicable ?? (
        <Button
          title={'Not applicable'}
          onPress={() => {
            updateResponse('Not applicable')
          }}
        />
      )}
    </>
  )
}
