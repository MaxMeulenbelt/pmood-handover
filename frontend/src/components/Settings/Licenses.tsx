import React, { Component } from 'react'
import { Linking, SectionList, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import RootStackParamList from '../../models/RootStackParamList'
import licenses from '../../../assets/Licenses/licenses.json'
import attributions from '../../../assets/Licenses/attributions.json'

type Props = NativeStackScreenProps<RootStackParamList, 'Licenses'>
type State = Record<string, unknown>

/**
 * Displays all the text acknowledgements and npm package licenses used in the app.
 *
 * The number of licenses used in this project is huge, performance is likely to be poor.
 *
 * @prop navigation The navigation object.
 */
export default class Licenses extends Component<Props, State> {
  packages: string[]

  constructor(props: Props) {
    super(props)
    this.packages = Object.keys(licenses)
  }

  render() {
    return (
      <View style={styles.container}>
        <SectionList
          sections={[
            { title: 'Attributions', data: attributions.attributions },
            { title: 'Licenses', data: this.packages },
          ]}
          renderItem={({ item, section }) =>
            section.title === 'Attributions' ? (
              <Text style={styles.row}>{item}</Text>
            ) : (
              // eslint-disable-next-line @typescript-eslint/no-misused-promises
              <TouchableOpacity key={item} onPress={() => Linking.openURL((licenses[item] as { repository: string }).repository).catch((e) => void e)}>
                <Text style={styles.row}>
                  {item} {'>'}
                </Text>
              </TouchableOpacity>
            )
          }
          renderSectionHeader={({ section }) => <Text style={styles.header}>{section.title}</Text>}
          keyExtractor={(item) => `listentry-${item}`}
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  row: {
    paddingLeft: 16,
    paddingRight: 16,
    paddingTop: 8,
    paddingBottom: 8,
  },
  header: {
    fontSize: 18,
    fontWeight: 'bold',
    backgroundColor: '#fff',
    paddingLeft: 16,
    paddingRight: 16,
    paddingTop: 8,
    paddingBottom: 8,
  },
})
