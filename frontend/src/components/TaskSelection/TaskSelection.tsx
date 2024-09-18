import React, { Component } from 'react'
import { StyleSheet, ScrollView, View, ImageSourcePropType, ImageBackground, Text, Pressable } from 'react-native'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import RootStackParamList from '../../models/RootStackParamList'
import TaskSelectionTile from './TaskSelectionTile'
import { LinearGradient } from 'expo-linear-gradient'
import { Avatar } from '@react-native-material/core'
import navigation from '../../lib/navigation'
import Header from './Header'

type Props = NativeStackScreenProps<RootStackParamList, 'TaskSelection'>
type State = Record<string, unknown>

/**
 * Renders a list of tasks that the user can navigation to.
 *
 * Implemented using a `ScrollView`. This renders all views at once, so it's not ideal for large lists, where a `FlatList` would be better.
 * As there are very few rows, this is fine and makes implementing static rows easier.
 *
 * @prop navigation The navigation object.
 */

export default class TaskSelection extends Component<Props, State> {
  render() {
    return (
      <View style={{ flex: 1 }}>
        <LinearGradient
          colors={['#CC94E0', '#E097D8', '#F6C19E', '#FDCBB4']}
          locations={[0, 0.45, 0.75, 1]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.overlay}
        ></LinearGradient>
        <ImageBackground
          // eslint-disable-next-line @typescript-eslint/no-var-requires
          source={require('frontend/assets/Reusable/iOS/background.png') as ImageSourcePropType}
          imageStyle={{ opacity: 0.55 }}
          style={{ flex: 1 }}
        >
          <Header />
          <ScrollView showsVerticalScrollIndicator={false} style={{ marginTop: 5, flex: 1 }}>
            <View style={{ display: 'flex', flexDirection: 'row', marginLeft: 20 }}>
              <Text style={styles.title}>Games</Text>
            </View>
            <View style={styles.row}>
              <TaskSelectionTile
                name="Risk Questionnaire"
                onPress={() => this.props.navigation.navigate('PDDQuiz')}
                // eslint-disable-next-line @typescript-eslint/no-var-requires
                icon={require('frontend/assets/GameThumbnails/iOS/how-doyou-feel-now.png') as ImageSourcePropType}
                imageProps={{ scale: 1, offsetX: 155, offsetY: 13 }}
                shape={'wide'}
                description={'Assess your risk of postnatal depression.'}
              />
            </View>
            <View style={styles.row}>
              <View style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' }}>
                <TaskSelectionTile
                  name="Now or Later"
                  onPress={() => this.props.navigation.navigate('DelayDiscounting')}
                  // eslint-disable-next-line @typescript-eslint/no-var-requires
                  icon={require('frontend/assets/GameThumbnails/iOS/now-or-later.png') as ImageSourcePropType}
                  imageProps={{ scale: 1.1, offsetX: -5, offsetY: 145 }}
                  shape={'tall'}
                  description={'If you were offered money now or later, how patient would you be?'}
                />

                <TaskSelectionTile
                  name="Memory Recall"
                  onPress={() => this.props.navigation.navigate('MemoryRecall')}
                  // eslint-disable-next-line @typescript-eslint/no-var-requires
                  icon={require('frontend/assets/GameThumbnails/iOS/memory-recall.png') as ImageSourcePropType}
                  imageProps={{ scale: 1.18, offsetX: -15, offsetY: 112 }}
                  shape={'tall'}
                  description={'Remember as many as words possible in a short span of time.'}
                />
              </View>
            </View>
            <View style={styles.row}>
              <TaskSelectionTile
                name="Fill the bar"
                onPress={() => this.props.navigation.navigate('EffortExpenditure')}
                // eslint-disable-next-line @typescript-eslint/no-var-requires
                icon={require('frontend/assets/GameThumbnails/iOS/button-pressing.png') as ImageSourcePropType}
                imageProps={{ scale: 1.1, offsetX: 152, offsetY: 31 }}
                shape={'wide'}
                description={'Test your strength by tapping buttons.'}
              />
            </View>

            <View style={styles.row}>
              <View style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' }}>
                {/* This task is commented as it was removed in the wave 1 build of the app.*/}

                {/* <TaskSelectionTile
                  name="Happy or Sad?"
                  onPress={() => this.props.navigation.navigate('EmotionSensitivity')}
                  // eslint-disable-next-line @typescript-eslint/no-var-requires
                  icon={require('frontend/assets/GameThumbnails/iOS/hbaby-sbaby.png') as ImageSourcePropType}
                  imageProps={{ scale: 1.2, offsetX: 6, offsetY: 125 }}
                  shape={'tall'}
                  description={'Can you identify the moods of these babies?'}
                /> */}

                <TaskSelectionTile
                  name="Patterns and Points"
                  onPress={() => this.props.navigation.navigate('ReinforcementLearning')}
                  // eslint-disable-next-line @typescript-eslint/no-var-requires
                  icon={require('frontend/assets/GameThumbnails/iOS/guess.png') as ImageSourcePropType}
                  imageProps={{ scale: 1.1, offsetX: 0, offsetY: 136 }}
                  shape={'tall'}
                  description={'Figure out the pattern and win points.'}
                />
                <TaskSelectionTile
                  name="Slot Machine"
                  onPress={() => this.props.navigation.navigate('SlotMachine')}
                  // eslint-disable-next-line @typescript-eslint/no-var-requires
                  icon={require('frontend/assets/GameThumbnails/iOS/slot-machine.png') as ImageSourcePropType}
                  imageProps={{ scale: 1.1, offsetX: 0, offsetY: 135 }}
                  shape={'tall'}
                  description={'Try your luck and spin the slot machine.'}
                />
              </View>
            </View>

            <View style={{ marginTop: 42 }}></View>
          </ScrollView>
        </ImageBackground>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: 'white',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    opacity: 1,
    flex: 1,
  },
  row: {
    marginTop: 20,
    marginHorizontal: 20,
  },
})
