/* eslint-disable @typescript-eslint/no-var-requires */

import { shuffle } from 'fast-shuffle'
import { ImageSourcePropType } from 'react-native'
import Emotion from '../models/EmotionSensitivity/Emotion'
import EmotionSensitivityImage from '../models/EmotionSensitivity/EmotionSensitivityImage'

/**
 * The images to be used in the emotion sensitivity task.
 * These images are defined in a separate lib file as Jest crashes with require() calls.
 */
const images: EmotionSensitivityImage[] = [
  { name: 'mn0.png', prop: require('../../assets/EmotionSensitivity/mn0.png') as ImageSourcePropType, answer: Emotion.Sad, intensity: 2 },
  { name: 'mn1.png', prop: require('../../assets/EmotionSensitivity/mn1.png') as ImageSourcePropType, answer: Emotion.Sad, intensity: 2 },
  { name: 'mn2.png', prop: require('../../assets/EmotionSensitivity/mn2.png') as ImageSourcePropType, answer: Emotion.Sad, intensity: 2 },
  { name: 'mn3.png', prop: require('../../assets/EmotionSensitivity/mn3.png') as ImageSourcePropType, answer: Emotion.Sad, intensity: 2 },
  { name: 'mn4.png', prop: require('../../assets/EmotionSensitivity/mn4.png') as ImageSourcePropType, answer: Emotion.Sad, intensity: 2 },
  { name: 'mn5.png', prop: require('../../assets/EmotionSensitivity/mn5.png') as ImageSourcePropType, answer: Emotion.Sad, intensity: 2 },
  { name: 'mn6.png', prop: require('../../assets/EmotionSensitivity/mn6.png') as ImageSourcePropType, answer: Emotion.Sad, intensity: 2 },
  { name: 'mn7.png', prop: require('../../assets/EmotionSensitivity/mn7.png') as ImageSourcePropType, answer: Emotion.Sad, intensity: 2 },
  { name: 'mn8.png', prop: require('../../assets/EmotionSensitivity/mn8.png') as ImageSourcePropType, answer: Emotion.Sad, intensity: 2 },
  { name: 'mn9.png', prop: require('../../assets/EmotionSensitivity/mn9.png') as ImageSourcePropType, answer: Emotion.Sad, intensity: 2 },

  { name: 'ln0.png', prop: require('../../assets/EmotionSensitivity/ln0.png') as ImageSourcePropType, answer: Emotion.Sad, intensity: 1 },
  { name: 'ln1.png', prop: require('../../assets/EmotionSensitivity/ln1.png') as ImageSourcePropType, answer: Emotion.Sad, intensity: 1 },
  { name: 'ln2.png', prop: require('../../assets/EmotionSensitivity/ln2.png') as ImageSourcePropType, answer: Emotion.Sad, intensity: 1 },
  { name: 'ln3.png', prop: require('../../assets/EmotionSensitivity/ln3.png') as ImageSourcePropType, answer: Emotion.Sad, intensity: 1 },
  { name: 'ln4.png', prop: require('../../assets/EmotionSensitivity/ln4.png') as ImageSourcePropType, answer: Emotion.Sad, intensity: 1 },
  { name: 'ln5.png', prop: require('../../assets/EmotionSensitivity/ln5.png') as ImageSourcePropType, answer: Emotion.Sad, intensity: 1 },
  { name: 'ln6.png', prop: require('../../assets/EmotionSensitivity/ln6.png') as ImageSourcePropType, answer: Emotion.Sad, intensity: 1 },
  { name: 'ln7.png', prop: require('../../assets/EmotionSensitivity/ln7.png') as ImageSourcePropType, answer: Emotion.Sad, intensity: 1 },
  { name: 'ln8.png', prop: require('../../assets/EmotionSensitivity/ln8.png') as ImageSourcePropType, answer: Emotion.Sad, intensity: 1 },
  { name: 'ln9.png', prop: require('../../assets/EmotionSensitivity/ln9.png') as ImageSourcePropType, answer: Emotion.Sad, intensity: 1 },

  { name: 'lp0.png', prop: require('../../assets/EmotionSensitivity/lp0.png') as ImageSourcePropType, answer: Emotion.Happy, intensity: 1 },
  { name: 'lp1.png', prop: require('../../assets/EmotionSensitivity/lp1.png') as ImageSourcePropType, answer: Emotion.Happy, intensity: 1 },
  { name: 'lp2.png', prop: require('../../assets/EmotionSensitivity/lp2.png') as ImageSourcePropType, answer: Emotion.Happy, intensity: 1 },
  { name: 'lp3.png', prop: require('../../assets/EmotionSensitivity/lp3.png') as ImageSourcePropType, answer: Emotion.Happy, intensity: 1 },
  { name: 'lp4.png', prop: require('../../assets/EmotionSensitivity/lp4.png') as ImageSourcePropType, answer: Emotion.Happy, intensity: 1 },
  { name: 'lp5.png', prop: require('../../assets/EmotionSensitivity/lp5.png') as ImageSourcePropType, answer: Emotion.Happy, intensity: 1 },
  { name: 'lp6.png', prop: require('../../assets/EmotionSensitivity/lp6.png') as ImageSourcePropType, answer: Emotion.Happy, intensity: 1 },
  { name: 'lp7.png', prop: require('../../assets/EmotionSensitivity/lp7.png') as ImageSourcePropType, answer: Emotion.Happy, intensity: 1 },
  { name: 'lp8.png', prop: require('../../assets/EmotionSensitivity/lp8.png') as ImageSourcePropType, answer: Emotion.Happy, intensity: 1 },
  { name: 'lp9.png', prop: require('../../assets/EmotionSensitivity/lp9.png') as ImageSourcePropType, answer: Emotion.Happy, intensity: 1 },

  { name: 'mp0.png', prop: require('../../assets/EmotionSensitivity/mp0.png') as ImageSourcePropType, answer: Emotion.Happy, intensity: 2 },
  { name: 'mp1.png', prop: require('../../assets/EmotionSensitivity/mp1.png') as ImageSourcePropType, answer: Emotion.Happy, intensity: 2 },
  { name: 'mp2.png', prop: require('../../assets/EmotionSensitivity/mp2.png') as ImageSourcePropType, answer: Emotion.Happy, intensity: 2 },
  { name: 'mp3.png', prop: require('../../assets/EmotionSensitivity/mp3.png') as ImageSourcePropType, answer: Emotion.Happy, intensity: 2 },
  { name: 'mp4.png', prop: require('../../assets/EmotionSensitivity/mp4.png') as ImageSourcePropType, answer: Emotion.Happy, intensity: 2 },
  { name: 'mp5.png', prop: require('../../assets/EmotionSensitivity/mp5.png') as ImageSourcePropType, answer: Emotion.Happy, intensity: 2 },
  { name: 'mp6.png', prop: require('../../assets/EmotionSensitivity/mp6.png') as ImageSourcePropType, answer: Emotion.Happy, intensity: 2 },
  { name: 'mp7.png', prop: require('../../assets/EmotionSensitivity/mp7.png') as ImageSourcePropType, answer: Emotion.Happy, intensity: 2 },
  { name: 'mp8.png', prop: require('../../assets/EmotionSensitivity/mp8.png') as ImageSourcePropType, answer: Emotion.Happy, intensity: 2 },
  { name: 'mp9.png', prop: require('../../assets/EmotionSensitivity/mp9.png') as ImageSourcePropType, answer: Emotion.Happy, intensity: 2 },
]

/**
 * Randomises the order that the images should be displayed in, by choosing a subset of all images, with each image presented 4 times.
 *
 * @returns A shuffled array of the images, in the order they should be presented
 */
const shuffledImagesForDisplay = () => {
  const happyImages = shuffle(images.filter((image) => image.answer === Emotion.Happy)).slice(0, 7)
  const sadImages = shuffle(images.filter((image) => image.answer === Emotion.Sad)).slice(0, 7)
  const imagesToDisplay = happyImages.concat(sadImages)
  const totalImages = imagesToDisplay.concat(imagesToDisplay, imagesToDisplay, imagesToDisplay)
  return shuffle(totalImages)
}

/**
 * Randomises the order that the practice images should be displayed in, with each 5 happy and 5 sad images, each with equal intensity.
 *
 * @returns A shuffled array of the practice images, in the order they should be presented
 */
const shuffledImagesForPractice = () => {
  const practiceImages = shuffle(images.filter((image) => image.answer === Emotion.Happy && image.intensity === 1))
    .slice(0, 2)
    .concat(shuffle(images.filter((image) => image.answer === Emotion.Happy && image.intensity === 2)).slice(0, 3))
    .concat(shuffle(images.filter((image) => image.answer === Emotion.Sad && image.intensity === 1)).slice(0, 2))
    .concat(shuffle(images.filter((image) => image.answer === Emotion.Sad && image.intensity === 2)).slice(0, 3))

  return shuffle(practiceImages)
}

export default {
  images,
  shuffledImagesForDisplay,
  shuffledImagesForPractice,
}
