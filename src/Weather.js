import React, { Component } from 'react';
import Axios from 'axios';

class Weather extends Component {
    constructor(props) {
        super(props)
        this.state = {
            windDirection: []
        };
      }

componentDidMount() {
  Axios.get('https://cors-anywhere.herokuapp.com/https://api.darksky.net/forecast/1f0ce7cb865b83d6ba17a661fcf9f49f/37.8267,-122.4233?time=[2017]-[09]-[13]T[00]:[00]:[00]&exclude=[hourly,minutely,daily,flags,alerts]')
        .then((response) => {
            this.setState({windDirection: response.data.currently.windBearing})
        });
};

render() {
    return (
      <div>{this.state.windDirection}</div>
    );
  }
}

export default Weather;