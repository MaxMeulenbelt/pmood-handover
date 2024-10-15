import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { View, StyleSheet, Text, Image, ImageBackground, ImageSourcePropType, Platform } from 'react-native'
import RootStackParamList from '../../models/RootStackParamList'
import { BlurView } from 'expo-blur'
import { LinearGradient } from 'expo-linear-gradient'
import TaskHeader from '../reusable/TaskHeader'
import navigation from '../../lib/navigation'
import ShareButton from '../reusable/ShareButton'
import BackgroundButton from '../reusable/BackgroundButton'

type NavProps = NativeStackScreenProps<RootStackParamList, 'EffortResults'>

export default function EffortResults(navProps: NavProps) {
  const { successRate, hardRate, score } = navProps.route.params
  return (
    <View style={styles.container}>
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
        imageStyle={{ opacity: 0.55, height: '100%' }}
      >
        <TaskHeader
          title={'Results'}
          iconType="home"
          backNav={() => {
            navigation.navigate('TaskSelection', {})
          }}
        />
        <View style={{ display: 'flex', alignItems: 'center', height: '10%', marginTop: '10%' }}>
          <Text style={styles.title}>Well Done!</Text>
        </View>
        <View style={{ height: '75%' }}>
          <View style={styles.blurContainer}>
            <BlurView style={[styles.blur, { height: '80%', width: '48%', padding: '7%' }]} intensity={40}>
              <Text style={styles.smallText}>How often you chose the harder game</Text>
              <View style={styles.resultsContainer}>
                <Text style={[styles.largeText, { marginTop: '25%' }]}>{navProps.route.params && hardRate}</Text>
                <Text style={styles.unitText}>%</Text>
              </View>
            </BlurView>
            <View style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', height: '100%', width: '48%' }}>
              <BlurView style={[styles.blur]} intensity={40}>
                <Text style={styles.smallText}>Success rate</Text>
                <View style={{ display: 'flex', flexWrap: 'wrap' }}></View>
                <View style={styles.resultsContainer}>
                  <Text style={styles.largeText}>{navProps.route.params && successRate}</Text>
                  <Text style={[styles.unitText, { textAlign: 'center' }]}>%</Text>
                </View>
              </BlurView>
              <BlurView style={[styles.blur]} intensity={40}>
                <Text style={styles.smallText}>Final score</Text>
                <View style={{ display: 'flex', flexWrap: 'wrap' }}></View>
                <View style={styles.resultsContainer}>
                  <Text style={styles.largeText}>{navProps.route.params && score}</Text>
                  <Text style={[styles.unitText, { textAlign: 'center', fontSize: 16 }]}>Points</Text>
                </View>
              </BlurView>
            </View>
          </View>
          <View style={{ position: 'absolute', width: '100%', display: 'flex', alignItems: 'center', marginTop: '54%' }}>
            {/* eslint-disable @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access */}
            <Image source={require('frontend/assets/Reusable/iOS/results.png')} />
          </View>
          <View style={{ width: '100%', height: '40%', alignItems: 'center', justifyContent: 'center', marginTop: '8%' }}>
            <View style={styles.shareButton}>
              <ShareButton taskName={'Delay Discounting'} value={`${score} points`} />
            </View>
            <View style={styles.homeButton}>
              <BackgroundButton
                style={{ borderRadius: 50, height: 46, width: '50%', alignSelf: 'center' }}
                onPress={() => {
                  navigation.navigate('TaskSelection', {})
                }}
                title="Go to Home"
              />
            </View>
          </View>
        </View>
      </ImageBackground>
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
    height: '60%',
    paddingHorizontal: '5%',
    justifyContent: 'space-between',
    width: '100%',
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
    height: '48%',
    borderColor: 'white',
    borderWidth: 1,
    display: 'flex',
    padding: '14%',
  },
  largeText: {
    fontSize: 54,
    color: 'white',
    marginTop: '-10%',
  },
  smallText: {
    fontSize: 16,
    color: 'white',
    height: '30%',
    width: '100%',
  },
  unitText: {
    fontSize: 24,
    color: 'white',
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
    justifyContent: 'space-around',
    alignItems: 'center',
    display: 'flex',
  },
})
