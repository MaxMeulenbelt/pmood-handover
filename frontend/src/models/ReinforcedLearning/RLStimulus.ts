import { ImageSourcePropType } from 'react-native'

/**
 * Stores the stimulus' % chance of being correct in addition to name and image
 */
type RLStimulus = {
  name1: string
  value1: number
  prop1: ImageSourcePropType
  name2: string
  value2: number
  prop2: ImageSourcePropType
}

export default RLStimulus
