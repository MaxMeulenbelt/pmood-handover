import React, { memo, useContext, useState } from 'react'
import { Dimensions, StyleSheet, View, Image, ImageSourcePropType } from 'react-native'
import SelectReel from './SelectReel'
import SpinReel from './SpinReel'
import videos from '../../lib/videos'
import { SlotsContext } from '../../lib/slotMachine'

type Props = {
  selected: boolean
  spinStart: number
}
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
function Machine(props: Props) {
  const { selected, spinStart } = props
  const [selectColor, setSelectColor] = useState('rgba(255,211,188, 0.6)')
  const context = useContext(SlotsContext)

  const adjustedStart = Math.abs(spinStart + 4) % 6
  console.log(context?.win, selected)
  return (
    <View style={styles.reelsContainer}>
      {context && <View style={[styles.selector, { backgroundColor: context.win && selected ? 'rgba(138,218,124,0.6)' : 'rgba(255,211,188, 0.6)' }]}></View>}
      <View style={{ display: 'flex', justifyContent: 'space-between' }}>
        <Image source={require('frontend/assets/Slots/UI/arrow-big.png')} style={{ height: 56, width: 56, alignSelf: 'center' }} />
        <SelectReel />
        <Image source={require('frontend/assets/Slots/UI/arrow-big.png')} style={{ height: 56, width: 56, alignSelf: 'center', transform: [{ rotate: '180deg' }] }} />
      </View>
      <View style={{ display: 'flex', justifyContent: 'center' }}>
        <SpinReel key={context?.numberOfGamesPlayed} spinning={selected} startingTile={adjustedStart} />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  reelsContainer: {
    flexDirection: 'row',
    alignSelf: 'center',
    borderWidth: 1,
    borderColor: 'white',
    borderRadius: 50,
    paddingVertical: '5%',
    width: '65%',
    height: '78%',
    backgroundColor: 'rgba(151, 151, 151, 0.2)',
    overflow: 'hidden',
    justifyContent: 'space-between',
  },
  selector: {
    width: '120%',
    height: '20%',
    position: 'absolute',
    alignSelf: 'center',
    backgroundColor: 'rgba(255,211,188, 0.4)',
  },
})

export default memo(Machine)
