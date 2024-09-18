import React, { Component } from 'react'
import { Text, View, StyleSheet } from 'react-native'

type Props = {
  allWords: string
  secondsPerWord: number
}

type State = {
  word: string
}

let intervalId: NodeJS.Timer
let wordArr: string[]

/**
 * Split allWords into word array
 */
function parseAllWords(allWords: string) {
  const words = allWords.toString().toLowerCase().split(',')
  wordArr = words
}

/**
 * ShowRecallWords
 *
 * @prop allWords: string of random words separated by comma
 * @prop secondsPerWord: seconds before moving to next word
 */
export default class ShowRecallWords extends Component<Props, State> {
  constructor(props: Props) {
    super(props)
    parseAllWords(this.props.allWords)
    this.state = { word: wordArr[0] }
    let count = 1
    intervalId = setInterval(() => {
      this.setState({
        word: wordArr[count++],
      })
    }, this.props.secondsPerWord * 1000)
  }

  componentWillUnmount() {
    clearInterval(intervalId)
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.wordText}> {this.state.word}</Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    height: '80%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  wordText: {
    fontSize: 50,
    fontWeight: 'bold',
    color: 'white',
  },
})
