/* eslint-disable @typescript-eslint/no-var-requires */
import { ImageSourcePropType } from 'react-native'
const homeIcons = {
  hbabySbaby: require('frontend/assets/GameThumbnails/iOS/hbaby-sbaby.png') as ImageSourcePropType,
  memoryRecall: require('frontend/assets/GameThumbnails/iOS/memory-recall.png') as ImageSourcePropType,
  guess: require('frontend/assets/GameThumbnails/iOS/guess.png') as ImageSourcePropType,
  nowOrLater: require('frontend/assets/GameThumbnails/iOS/now-or-later.png') as ImageSourcePropType,
  slotMachine: require('frontend/assets/GameThumbnails/iOS/slot-machine.png') as ImageSourcePropType,
  buttonPressing: require('frontend/assets/GameThumbnails/iOS/button-pressing.png') as ImageSourcePropType,
  readYourMood: require('frontend/assets/GameThumbnails/iOS/read-your-mood.png') as ImageSourcePropType,
}

export default { homeIcons }
