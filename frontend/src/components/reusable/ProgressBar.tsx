import React, { Component } from 'react'
import * as Progress from 'react-native-progress'

type Props = {
  totalSeconds: number
  key?: number // To make sure component reloads
}
type State = {
  seconds: number
}

let intervalId: NodeJS.Timer

/**
 * Progress bar
 *
 * @prop totalSeconds: total time from start to end in seconds
 * @prop key: to make sure component reloads
 * @state seconds: seconds elapsed since start
 */
export default class ProgressBar extends Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = { seconds: 0 }
  }

  componentDidMount() {
    intervalId = setInterval(() => {
      this.setState({
        seconds: this.state.seconds + 0.1,
      })
    }, 100)
  }

  componentWillUnmount() {
    clearInterval(intervalId)
    this.setState({
      seconds: 0,
    })
  }

  render() {
    return (
      <Progress.Bar
        style={{
          marginHorizontal: '12%',
          marginTop: '5%',
          width: '76%',
          borderRadius: 50,
          position: 'absolute',
        }}
        progress={this.state.seconds / this.props.totalSeconds}
        height={20}
        width={null}
        color={'white'}
      />
    )
  }
}
