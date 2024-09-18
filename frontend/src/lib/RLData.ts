/* eslint @typescript-eslint/no-var-requires: "off" */

import { shuffle } from 'fast-shuffle'
import { ImageSourcePropType } from 'react-native'
import RLStimulus from '../models/ReinforcedLearning/RLStimulus'

/**
 * Specific prompts for the training portion of the task
 */
const trainingPrompts: RLStimulus[] = [
  {
    name1: 'a',
    value1: 0.8,
    prop1: require('../../assets/ReinforcedLearning/a.png') as ImageSourcePropType,
    name2: 'b',
    value2: 0.2,
    prop2: require('../../assets/ReinforcedLearning/b.png') as ImageSourcePropType,
  },
  {
    name1: 'b',
    value1: 0.2,
    prop1: require('../../assets/ReinforcedLearning/b.png') as ImageSourcePropType,
    name2: 'a',
    value2: 0.8,
    prop2: require('../../assets/ReinforcedLearning/a.png') as ImageSourcePropType,
  },
  {
    name1: 'c',
    value1: 0.7,
    prop1: require('../../assets/ReinforcedLearning/c.png') as ImageSourcePropType,
    name2: 'd',
    value2: 0.3,
    prop2: require('../../assets/ReinforcedLearning/d.png') as ImageSourcePropType,
  },
  {
    name1: 'd',
    value1: 0.3,
    prop1: require('../../assets/ReinforcedLearning/d.png') as ImageSourcePropType,
    name2: 'c',
    value2: 0.7,
    prop2: require('../../assets/ReinforcedLearning/c.png') as ImageSourcePropType,
  },
  {
    name1: 'e',
    value1: 0.6,
    prop1: require('../../assets/ReinforcedLearning/e.png') as ImageSourcePropType,
    name2: 'f',
    value2: 0.4,
    prop2: require('../../assets/ReinforcedLearning/f.png') as ImageSourcePropType,
  },
  {
    name1: 'f',
    value1: 0.4,
    prop1: require('../../assets/ReinforcedLearning/f.png') as ImageSourcePropType,
    name2: 'e',
    value2: 0.6,
    prop2: require('../../assets/ReinforcedLearning/e.png') as ImageSourcePropType,
  },
]

/**
 * Specific prompts for the testing portions of the task, containing all permutations of stimulus pairs (30)
 */
const testingPrompts: RLStimulus[] = [
  {
    name1: 'a',
    value1: 0.8,
    prop1: require('../../assets/ReinforcedLearning/a.png') as ImageSourcePropType,
    name2: 'b',
    value2: 0.2,
    prop2: require('../../assets/ReinforcedLearning/b.png') as ImageSourcePropType,
  },
  {
    name1: 'a',
    value1: 0.8,
    prop1: require('../../assets/ReinforcedLearning/a.png') as ImageSourcePropType,
    name2: 'c',
    value2: 0.7,
    prop2: require('../../assets/ReinforcedLearning/c.png') as ImageSourcePropType,
  },
  {
    name1: 'a',
    value1: 0.8,
    prop1: require('../../assets/ReinforcedLearning/a.png') as ImageSourcePropType,
    name2: 'd',
    value2: 0.3,
    prop2: require('../../assets/ReinforcedLearning/d.png') as ImageSourcePropType,
  },
  {
    name1: 'a',
    value1: 0.8,
    prop1: require('../../assets/ReinforcedLearning/a.png') as ImageSourcePropType,
    name2: 'e',
    value2: 0.6,
    prop2: require('../../assets/ReinforcedLearning/e.png') as ImageSourcePropType,
  },
  {
    name1: 'a',
    value1: 0.8,
    prop1: require('../../assets/ReinforcedLearning/a.png') as ImageSourcePropType,
    name2: 'f',
    value2: 0.4,
    prop2: require('../../assets/ReinforcedLearning/f.png') as ImageSourcePropType,
  },
  {
    name1: 'b',
    value1: 0.2,
    prop1: require('../../assets/ReinforcedLearning/b.png') as ImageSourcePropType,
    name2: 'a',
    value2: 0.8,
    prop2: require('../../assets/ReinforcedLearning/a.png') as ImageSourcePropType,
  },
  {
    name1: 'b',
    value1: 0.2,
    prop1: require('../../assets/ReinforcedLearning/b.png') as ImageSourcePropType,
    name2: 'c',
    value2: 0.7,
    prop2: require('../../assets/ReinforcedLearning/c.png') as ImageSourcePropType,
  },
  {
    name1: 'b',
    value1: 0.2,
    prop1: require('../../assets/ReinforcedLearning/b.png') as ImageSourcePropType,
    name2: 'd',
    value2: 0.3,
    prop2: require('../../assets/ReinforcedLearning/d.png') as ImageSourcePropType,
  },
  {
    name1: 'b',
    value1: 0.2,
    prop1: require('../../assets/ReinforcedLearning/b.png') as ImageSourcePropType,
    name2: 'e',
    value2: 0.6,
    prop2: require('../../assets/ReinforcedLearning/e.png') as ImageSourcePropType,
  },
  {
    name1: 'b',
    value1: 0.2,
    prop1: require('../../assets/ReinforcedLearning/b.png') as ImageSourcePropType,
    name2: 'f',
    value2: 0.4,
    prop2: require('../../assets/ReinforcedLearning/f.png') as ImageSourcePropType,
  },
  {
    name1: 'c',
    value1: 0.7,
    prop1: require('../../assets/ReinforcedLearning/c.png') as ImageSourcePropType,
    name2: 'a',
    value2: 0.8,
    prop2: require('../../assets/ReinforcedLearning/a.png') as ImageSourcePropType,
  },
  {
    name1: 'c',
    value1: 0.7,
    prop1: require('../../assets/ReinforcedLearning/c.png') as ImageSourcePropType,
    name2: 'b',
    value2: 0.2,
    prop2: require('../../assets/ReinforcedLearning/b.png') as ImageSourcePropType,
  },
  {
    name1: 'c',
    value1: 0.7,
    prop1: require('../../assets/ReinforcedLearning/c.png') as ImageSourcePropType,
    name2: 'd',
    value2: 0.3,
    prop2: require('../../assets/ReinforcedLearning/d.png') as ImageSourcePropType,
  },
  {
    name1: 'c',
    value1: 0.7,
    prop1: require('../../assets/ReinforcedLearning/c.png') as ImageSourcePropType,
    name2: 'e',
    value2: 0.6,
    prop2: require('../../assets/ReinforcedLearning/e.png') as ImageSourcePropType,
  },
  {
    name1: 'c',
    value1: 0.7,
    prop1: require('../../assets/ReinforcedLearning/c.png') as ImageSourcePropType,
    name2: 'f',
    value2: 0.4,
    prop2: require('../../assets/ReinforcedLearning/f.png') as ImageSourcePropType,
  },
  {
    name1: 'd',
    value1: 0.3,
    prop1: require('../../assets/ReinforcedLearning/d.png') as ImageSourcePropType,
    name2: 'a',
    value2: 0.8,
    prop2: require('../../assets/ReinforcedLearning/a.png') as ImageSourcePropType,
  },
  {
    name1: 'd',
    value1: 0.3,
    prop1: require('../../assets/ReinforcedLearning/d.png') as ImageSourcePropType,
    name2: 'b',
    value2: 0.2,
    prop2: require('../../assets/ReinforcedLearning/b.png') as ImageSourcePropType,
  },
  {
    name1: 'd',
    value1: 0.3,
    prop1: require('../../assets/ReinforcedLearning/d.png') as ImageSourcePropType,
    name2: 'c',
    value2: 0.7,
    prop2: require('../../assets/ReinforcedLearning/c.png') as ImageSourcePropType,
  },
  {
    name1: 'd',
    value1: 0.3,
    prop1: require('../../assets/ReinforcedLearning/d.png') as ImageSourcePropType,
    name2: 'e',
    value2: 0.6,
    prop2: require('../../assets/ReinforcedLearning/e.png') as ImageSourcePropType,
  },
  {
    name1: 'd',
    value1: 0.3,
    prop1: require('../../assets/ReinforcedLearning/d.png') as ImageSourcePropType,
    name2: 'f',
    value2: 0.4,
    prop2: require('../../assets/ReinforcedLearning/f.png') as ImageSourcePropType,
  },
  {
    name1: 'e',
    value1: 0.6,
    prop1: require('../../assets/ReinforcedLearning/e.png') as ImageSourcePropType,
    name2: 'a',
    value2: 0.8,
    prop2: require('../../assets/ReinforcedLearning/a.png') as ImageSourcePropType,
  },
  {
    name1: 'e',
    value1: 0.6,
    prop1: require('../../assets/ReinforcedLearning/e.png') as ImageSourcePropType,
    name2: 'b',
    value2: 0.2,
    prop2: require('../../assets/ReinforcedLearning/b.png') as ImageSourcePropType,
  },
  {
    name1: 'e',
    value1: 0.6,
    prop1: require('../../assets/ReinforcedLearning/e.png') as ImageSourcePropType,
    name2: 'c',
    value2: 0.7,
    prop2: require('../../assets/ReinforcedLearning/c.png') as ImageSourcePropType,
  },
  {
    name1: 'e',
    value1: 0.6,
    prop1: require('../../assets/ReinforcedLearning/e.png') as ImageSourcePropType,
    name2: 'd',
    value2: 0.3,
    prop2: require('../../assets/ReinforcedLearning/d.png') as ImageSourcePropType,
  },
  {
    name1: 'e',
    value1: 0.6,
    prop1: require('../../assets/ReinforcedLearning/e.png') as ImageSourcePropType,
    name2: 'f',
    value2: 0.4,
    prop2: require('../../assets/ReinforcedLearning/f.png') as ImageSourcePropType,
  },
  {
    name1: 'f',
    value1: 0.4,
    prop1: require('../../assets/ReinforcedLearning/f.png') as ImageSourcePropType,
    name2: 'a',
    value2: 0.8,
    prop2: require('../../assets/ReinforcedLearning/a.png') as ImageSourcePropType,
  },
  {
    name1: 'f',
    value1: 0.4,
    prop1: require('../../assets/ReinforcedLearning/f.png') as ImageSourcePropType,
    name2: 'b',
    value2: 0.2,
    prop2: require('../../assets/ReinforcedLearning/b.png') as ImageSourcePropType,
  },
  {
    name1: 'f',
    value1: 0.4,
    prop1: require('../../assets/ReinforcedLearning/f.png') as ImageSourcePropType,
    name2: 'c',
    value2: 0.7,
    prop2: require('../../assets/ReinforcedLearning/c.png') as ImageSourcePropType,
  },
  {
    name1: 'f',
    value1: 0.4,
    prop1: require('../../assets/ReinforcedLearning/f.png') as ImageSourcePropType,
    name2: 'd',
    value2: 0.3,
    prop2: require('../../assets/ReinforcedLearning/d.png') as ImageSourcePropType,
  },
  {
    name1: 'f',
    value1: 0.4,
    prop1: require('../../assets/ReinforcedLearning/f.png') as ImageSourcePropType,
    name2: 'e',
    value2: 0.6,
    prop2: require('../../assets/ReinforcedLearning/e.png') as ImageSourcePropType,
  },
]

/**
 * Randomises the order that the images should be displayed in.
 *
 * @returns A shuffled array of the prompts, repeated five times, in the order they should be presented.
 */
const shuffledPromptsForDisplay = (): RLStimulus[] => {
  const totalPrompts = trainingPrompts.concat(trainingPrompts, trainingPrompts, trainingPrompts, trainingPrompts)
  return shuffle(totalPrompts)
}

/**
 * Randomises the order that the imagess should be displayed in.
 *
 * @returns A shuffled array of the prompts in the order they should be presented.
 */
const shuffledTestingPrompts = (): RLStimulus[] => {
  return shuffle(testingPrompts)
}

export default {
  trainingPrompts,
  testingPrompts,
  shuffledPromptsForDisplay,
  shuffledTestingPrompts,
}
