/**
 * The result of a user's response to the emotion sensitivity challenge.
 */
type EmotionSensitivityScore = {
  score: number
  averageResponseTime: number
  hitRate: number
  falseAlarmRate: number
  totalMisses: number
}

export default EmotionSensitivityScore
