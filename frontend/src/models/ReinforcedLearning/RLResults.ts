/**
 * Formatting possible choices, the chance those responses are correct, and the user response
 */
type RLResults = {
  // userId: number
  questionNumber: number
  leftImageName: string
  leftImageProbability: number
  rightImageName: string
  rightImageProbability: number
  userResponse: string
  initialTimestamp: Date
  responseTimestamp: Date
  correctChoice: number
}

export default RLResults
