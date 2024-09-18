import EmotionSensitivityScore from '../models/EmotionSensitivity/EmotionSensitivityScore'
import ImageChallengeResult from '../models/EmotionSensitivity/ImageChallengeResult'
import Emotion from '../models/EmotionSensitivity/Emotion'
import utils from './utils'

/**
 * Calculates the result of the emotion sensitivity task.
 *
 * @param results The results of the emotion sensitivity task.
 * @returns The score and average response time for the emotion sensitivity task.
 */
const calculateEmotionSensitivity = (results: ImageChallengeResult[]): EmotionSensitivityScore => {
  return {
    score: calculateScore(results),
    averageResponseTime: calculateAverageResponseTime(results),
    hitRate: calculateHitRate(results),
    falseAlarmRate: calculateFalseAlarmRate(results),
    totalMisses: getResponseMisses(results).length,
  }
}

/**
 * Calculates the user's score for the emotion sensitivity task.
 *
 * @param results The results of the emotion sensitivity task.
 * @returns The user's score in the emotion sensitivity task.
 */
const calculateScore = (results: ImageChallengeResult[]) => {
  const correctAnswers = results.filter((result) => result.emotion === result.image.answer).length
  return correctAnswers / results.length || 0
}

/**
 * Calculates the user's average response time for the emotion sensitivity task.
 *
 * @param results The results of the emotion sensitivity task.
 * @returns The user's average response time for the emotion sensitivity task.
 */
const calculateAverageResponseTime = (results: ImageChallengeResult[]) => {
  const responseTimes = results.map((result) => result.emotionTimestamp.getTime() - result.initialTimestamp.getTime())
  return utils.average(responseTimes)
}

/**
 * Gets the Hit Rate (HR) from a user's emotion sensitivity task results.
 *
 * The Hit Rate is the proportion of correctly classified 'Sad' responses (responding 'Sad' when a sad stimulus is presented).
 *
 * @param results The results of the emotion sensitivity task.
 * @returns The user's Hit Rate for the emotion sensitivity task attempt.
 */
const calculateHitRate = (results: ImageChallengeResult[]) => {
  const hits = getResponseHits(results).length
  const misses = getResponseMisses(results).length
  return hits / (hits + misses) || 0
}

/**
 * Gets the False Alarm (FAR) from a user's emotion sensitivity task results.
 *
 * The False Alarm Rate is the proportion of incorrectly classified 'Sad' responses (responding 'Sad' when a happy stimulus is presented).
 *
 * @param results The results of the emotion sensitivity task.
 * @returns The user's False Alarm Rate for the emotion sensitivity task attempt.
 */
const calculateFalseAlarmRate = (results: ImageChallengeResult[]) => {
  const falseAlarms = getResponseFalseAlarms(results).length
  const correctRejections = getResponseCorrectRejections(results).length
  return falseAlarms / (falseAlarms + correctRejections) || 0
}

/**
 * Gets the Hits (H) from a user's emotion sensitivity task results.
 *
 * A Hit is a 'Sad' response when a sad stimulus is presented.
 *
 * @param results The results of the emotion sensitivity task.
 * @returns The user's results from the emotion sensitivity task attempt that are Hits.
 */
const getResponseHits = (results: ImageChallengeResult[]) => results.filter((result) => result.image.answer === Emotion.Sad && result.emotion === Emotion.Sad)

/**
 * Gets the Misses (M) from a user's emotion sensitivity task results.
 *
 * A Miss is a 'Happy' response when a sad stimulus is presented.
 *
 * @param results The results of the emotion sensitivity task.
 * @returns The user's results from the emotion sensitivity task attempt that are Misses.
 */
const getResponseMisses = (results: ImageChallengeResult[]) => results.filter((result) => result.image.answer === Emotion.Sad && result.emotion === Emotion.Happy)

/**
 * Gets the False Alarms (FA) from a user's emotion sensitivity task results.
 *
 * A False Alarm is a 'Sad' response when a happy stimulus is presented.
 *
 * @param results The results of the emotion sensitivity task.
 * @returns The user's results from the emotion sensitivity task attempt that are False Alarms.
 */
const getResponseFalseAlarms = (results: ImageChallengeResult[]) => results.filter((result) => result.image.answer === Emotion.Happy && result.emotion === Emotion.Sad)

/**
 * Gets the Correct Rejections (CR) from a user's emotion sensitivity task results.
 *
 * A Correct Rejection is a 'Happy' response when a happy stimulus is presented.
 *
 * @param results The results of the emotion sensitivity task.
 * @returns The user's results from the emotion sensitivity task attempt that are Correct Rejections.
 */
const getResponseCorrectRejections = (results: ImageChallengeResult[]) => results.filter((result) => result.image.answer === Emotion.Happy && result.emotion === Emotion.Happy)

export default {
  calculateEmotionSensitivity,
  calculateScore,
  calculateAverageResponseTime,
  calculateHitRate,
  calculateFalseAlarmRate,
  getResponseHits,
  getResponseMisses,
  getResponseFalseAlarms,
  getResponseCorrectRejections,
}
