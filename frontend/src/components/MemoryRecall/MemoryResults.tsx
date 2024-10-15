import { LinearGradient } from 'expo-linear-gradient'
import { View, StyleSheet, Text, Image, Platform } from 'react-native'
import TaskHeader from '../reusable/TaskHeader'
import navigation from '../../lib/navigation'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import RootStackParamList from '../../models/RootStackParamList'
import { BlurView } from 'expo-blur'
import BackgroundButton from '../reusable/BackgroundButton'
import ShareButton from '../reusable/ShareButton'

type NavProps = NativeStackScreenProps<RootStackParamList, 'MemoryResults'>

export default function MemoryResults(navProps: NavProps) {
  const { recalledWords } = navProps.route.params

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['#CC94E0', '#E097D8', '#F6C19E', '#FDCBB4']}
        locations={[0, 0.45, 0.75, 1]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.overlay}
      ></LinearGradient>
      <TaskHeader
        title={'Results'}
        iconType="home"
        backNav={() => {
          navigation.navigate('TaskSelection', {})
        }}
      />
      <View style={{ display: 'flex', alignItems: 'center', marginVertical: '10%' }}>
        <Text style={styles.title}>Well Done!</Text>
      </View>
      <View style={styles.blurContainer}>
        <BlurView style={styles.blur} intensity={40}>
          <Text style={styles.smallText}>Correctly recalled words</Text>
          <View style={styles.resultsContainer}>
            <Text style={styles.largeText}>{recalledWords}</Text>
            <Text style={styles.unitText}>out of 20</Text>
          </View>
        </BlurView>
      </View>
      <View style={{ width: '100%', display: 'flex', alignItems: 'center', marginVertical: '6%' }}>
        {/* eslint-disable @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access */}
        <Image source={require('frontend/assets/Reusable/iOS/results.png')} />
      </View>
      <View style={styles.shareButton}>{navProps.route.params && <ShareButton taskName={'Memory Recall'} value={`${recalledWords} words`} />}</View>
      <View style={styles.homeButton}>
        <BackgroundButton
          style={{ marginBottom: '40%', borderRadius: 50, height: 46, width: '50%', alignSelf: 'center' }}
          onPress={() => {
            navigation.navigate('TaskSelection', {})
          }}
          title="Go to Home"
        />
      </View>
    </View>
  )
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  blurContainer: {
    display: 'flex',
    flexDirection: 'row',
    height: '22%',
    paddingHorizontal: '5%',
    justifyContent: 'space-between',
    width: '100%',
    alignItems: 'center',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    opacity: 1,
  },
  shareButton: {
    alignSelf: 'center',
    width: '100%',
  },
  homeButton: {
    alignSelf: 'center',
    marginTop: '3%',
    width: '100%',
  },
  blur: {
    borderRadius: 42,
    overflow: 'hidden',
    backgroundColor: 'rgba(97,97,97, 0.22)',
    width: '100%',
    borderColor: 'white',
    borderWidth: 1,
    display: 'flex',
    padding: '6%',
  },
  largeText: {
    fontSize: 54,
    color: 'white',
  },
  smallText: {
    fontSize: 16,
    color: 'white',
    height: '30%',
    width: '100%',
    textAlign: 'center',
  },
  unitText: {
    fontSize: 16,
    color: 'white',
    height: '25%',
    textAlign: 'center',
    marginTop: '-2%',
  },
  title: {
    fontSize: 32,
    fontFamily: Platform.OS === 'ios' ? 'Chalkboard SE' : 'Roboto',
    color: 'white',
    fontWeight: 'bold',
  },
  resultsContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    height: '65%',
    marginTop: '-5%',
    display: 'flex',
  },
})
