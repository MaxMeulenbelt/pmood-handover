import React, { Component, ReactNode } from 'react'
import { StyleProp, ViewStyle } from 'react-native'
import TypeWriter from 'react-native-typewriter'

type Props = {
  style?: StyleProp<ViewStyle>
  children?: ReactNode
  initDelay?: number
}
type State = Record<string, unknown>

/**
 * A text component that animates the text being typed out.
 *
 * @prop style Additional styles to apply to the text.
 * @prop children The text to display.
 */
export default class TypingText extends Component<Props, State> {
  render() {
    return (
      <TypeWriter style={this.props.style} typing={1} fixed={true} maxDelay={10} minDelay={10} initialDelay={this.props.initDelay}>
        {this.props.children}
      </TypeWriter>
    )
  }
}
