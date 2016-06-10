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

const backgrounds = {
  flowers: require('../img/bgs/flowers.png'),
  lightning: require('../img/bgs/lightning.png'),
  rain: require('../img/bgs/rain.png'),
  snow: require('../img/bgs/snow.png'),
  sunny: require('../img/bgs/sunny.png'),
  cloudy: require('../img/bgs/clouds.png')
};

export default class WeatherProject extends Component {
  constructor(props) {
    super(props);
    this.state = {
      zip: '',
      forecast: {
        name: '',
        code: null,
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
          source={this._getBackgroundImage()}
          resizeMode='cover'
          style={styles.backdrop}
          key={this._getBackgroundImage(true)}>
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
  _getBackgroundImage(keyOnly = false) {
    let { code } = this.state.forecast;
    let image = 'flowers';

    if (code >= 200 && code < 300) {
      image = 'lightning';
    } else if (code >= 300 && code < 600) {
      image = 'rain';
    } else if (code >= 600 && code < 700) {
      image = 'snow';
    } else if (code === 800) {
      image = 'sunny';
    } else if (code >= 801 && code < 900) {
      image = 'cloudy';
    }

    if (keyOnly) {
      return image;
    }

    return backgrounds[image];
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
      code,
      main,
      description,
      temp
    } = weather;

    this.setState({
      forecast: {
        name,
        code,
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
    alignItems: 'center'
  },
  backdrop: {
    flex: 1,
    flexDirection: 'column'
  },
  overlay: {
    paddingTop: 5,
    backgroundColor: '#000000',
    opacity: 0.7,
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
