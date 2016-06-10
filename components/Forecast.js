import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View
} from 'react-native';

export default class Forecast extends Component {
  render() {
    if (!this.props.name) {
      return (
        <View style={styles.container}>
          <Text style={styles.mainText}>Loading...</Text>
        </View>
      );
    }
    return (
      <View style={styles.container}>
        <Text style={styles.mainText}>
          {this.props.name.toUpperCase()}
        </Text>
        <Text style={styles.bigText}>
          {this.props.main} {this.props.temp}°F
        </Text>
        <Text style={styles.mainText}>
          Current conditions: {this.props.description}
        </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    paddingBottom: 30
  },
  bigText: {
    flex: 2,
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
    color: '#FFFFFF'
  },
  mainText: {
    flex: 1,
    fontSize: 16,
    textAlign: 'center',
    color: '#FFFFFF'
  }
});
