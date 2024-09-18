import { View, StyleSheet, Text } from 'react-native'

type Props = {
  symbol: string
  num: number
}

export default function DistractionTile(props: Props) {
  const { symbol, num } = props
  return (
    <View style={styles.container}>
      <Text style={styles.num}>{num}</Text>
      <View style={{ justifyContent: 'center' }}>
        <Text style={[styles.symbol, { transform: [{ translateY: num === 1 || num > 7 ? 0 : -10 }] }]}>{symbol}</Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 24,
    backgroundColor: 'rgba(13,13,13,0.4)',
    width: '30%',
    height: '32%',
    margin: '1%',
    padding: '3%',
  },
  symbol: {
    textAlign: 'center',
    fontSize: 30,
    color: 'white',
    // fontWeight:'bold'
  },
  num: {
    color: 'white',
    fontSize: 16,
  },
})
