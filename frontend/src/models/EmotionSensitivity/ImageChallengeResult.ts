import Emotion from './Emotion'
import EmotionSensitivityImage from './EmotionSensitivityImage'

/**
 * The result of a user's response to an image challenge.
 */
type ImageChallengeResult = {
  image: EmotionSensitivityImage
  emotion: Emotion
  initialTimestamp: Date
  emotionTimestamp: Date
}

export default ImageChallengeResult
