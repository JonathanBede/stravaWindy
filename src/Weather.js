import React, { Component } from 'react';
import Axios from 'axios';
import unixTime from 'unix-time';

class Weather extends Component {
constructor(props) {
  super(props)
  this.state = {
    windDirection: []
  };
}


componentDidMount() {
  const time = unixTime(new Date(this.props.time)); // 1374016861
  console.log(time);

  Axios.get(`https://cors-anywhere.herokuapp.com/https://api.darksky.net/forecast/1f0ce7cb865b83d6ba17a661fcf9f49f/${this.props.startLat},${this.props.startLong},${time}?exclude=flags`)
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