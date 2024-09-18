import { ImageSourcePropType } from 'react-native'
import Emotion from './Emotion'

/**
 * The image for an emotion sensitivity challenge.
 */
type EmotionSensitivityImage = {
  name: string
  prop: ImageSourcePropType
  answer: Emotion
  intensity: number
}

export default EmotionSensitivityImage
