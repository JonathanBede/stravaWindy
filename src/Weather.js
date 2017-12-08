import React, { Component } from 'react';
import Axios from 'axios';
import unixTime from 'unix-time';

class Weather extends Component {
constructor(props) {
  super(props)
  this.state = {
    weather: []
  };
}


componentDidMount() {
  const time = unixTime(new Date(this.props.time));

  Axios.get(`https://cors-anywhere.herokuapp.com/https://api.darksky.net/forecast/1f0ce7cb865b83d6ba17a661fcf9f49f/${this.props.startLat},${this.props.startLong},${time}?exclude=flags`)
    .then((response) => {
        this.setState({weather: response.data.currently})
        console.log(this.state);
    });
};

render() {

  const divStyle = {
    color: 'blue',
    transform: 'rotateZ(' + this.state.weather.windBearing + 'deg)'
  };

    return (
      <div className="weather">
        <div className="summary">{this.state.weather.summary}</div>
        <svg style={divStyle} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M22 12l-20 12 5-12-5-12z"/></svg>
      </div>
    );
  }
}

export default Weather;