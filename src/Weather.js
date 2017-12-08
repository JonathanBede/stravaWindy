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

  const windBearing = {
    fill: 'black',
    opacity: '0' + this.state.weather.windSpeed,
    transform: `rotateZ(${this.state.weather.windBearing}deg)`
  };

  const segmentStyle = {
    fill: '#ddd',
    transform: `rotateZ(${this.props.segmentBearing}deg)`
  };

    return (
      <div className="weather">
        <div className="summary">{this.state.weather.summary}</div>
        <div className="arrows">
          <svg style={segmentStyle}xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M12 0l8 9h-6v15h-4v-15h-6z"/></svg>
          <svg style={windBearing}xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M12 0l8 9h-6v15h-4v-15h-6z"/></svg>
        
        </div>
      </div>
    );
  }
}

export default Weather;