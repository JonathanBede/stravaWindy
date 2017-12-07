import React, { Component } from 'react';
import Axios from 'axios';

class Weather extends Component {

componentDidMount() {
  Axios.get('https://cors-anywhere.herokuapp.com/https://api.darksky.net/forecast/1f0ce7cb865b83d6ba17a661fcf9f49f/37.8267,-122.4233')
        .then(function (response) {
            console.log(response);
        });
};

  render() {
    return (
      <div>Weather</div>
    );
  }
}

export default Weather;