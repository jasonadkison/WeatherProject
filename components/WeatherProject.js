import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Image
} from 'react-native';
import Forecast from './Forecast';
import { getWeatherFromZipcode } from '../utils/weather_api';

export default class WeatherProject extends Component {
  constructor(props) {
    super(props);
    this.state = {
      zip: '',
      forecast: {
        name: '',
        main: '',
        description: '',
        temp: null
      },
      error: false
    };
  }
  render() {
    return (
      <View style={styles.container}>
        <Image
          source={require('image!flowers')}
          resizeMode='cover'
          style={styles.backdrop}>
          <View style={styles.overlay}>
            <View style={styles.row}>
              <Text style={styles.mainText}>
                Current weather for
              </Text>
              <View style={styles.zipContainer}>
                <TextInput
                  style={[styles.zipCode, styles.mainText]}
                  returnKeyType='go'
                  onSubmitEditing={this._handleTextChange.bind(this)} />
              </View>
            </View>
            {this._forecast()}
          </View>
        </Image>
      </View>
    );
  }
  _handleTextChange(e) {
    let zip = e.nativeEvent.text;
    let filteredZip = zip.replace(/\D/g, '');

    if (!zip.replace(/ /g,'')) {
      this.setState({ error: false });
      return;
    } else if (filteredZip.length !== 5) {
      this.setState({
        error: 'Invalid zip code.'
      });
      return;
    }

    this.setState({ zip: filteredZip, error: false });

    getWeatherFromZipcode(filteredZip, this._updateForecastWeather.bind(this));
  }
  _forecast() {
    if (this.state.error) {
      return <Text style={styles.errorText}>{this.state.error}</Text>;
    }
    if (this.state.zip) {
      return <Forecast {...this.state.forecast} />;
    }
    return null;
  }
  _updateForecastWeather(weather) {
    let {
      name,
      main,
      description,
      temp
    } = weather;

    this.setState({
      forecast: {
        name,
        main,
        description,
        temp
      }
    });
  }
}

const baseFontSize = 16;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    paddingTop: 30
  },
  backdrop: {
    flex: 1,
    flexDirection: 'column'
  },
  overlay: {
    paddingTop: 5,
    backgroundColor: '#000000',
    opacity: 0.5,
    flexDirection: 'column',
    alignItems: 'center'
  },
  row: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'nowrap',
    alignItems: 'flex-start',
    padding: 30
  },
  zipContainer: {
    flex: 1,
    borderBottomColor: '#DDDDDD',
    borderBottomWidth: 1,
    marginLeft: 5,
    marginTop: 3
  },
  zipCode: {
    width: 50,
    height: baseFontSize
  },
  mainText: {
    flex: 1,
    fontSize: baseFontSize,
    color: '#FFFFFF'
  },
  errorText: {
    flex: 1,
    color: '#F30000',
    padding: 30
  }
});
