import React, { Component } from 'react';
import Axios from 'axios';
import Weather from './Weather';
import Map from './MapContainer';
import secToMin from 'sec-to-min';


const urlForSegment = segmentID => `https://www.strava.com/api/v3/segments/${segmentID}?access_token=ea0e82c6e8cc3d19a57f22823f175b52062ce456`
const urlForLeaderboard = segmentID => `https://www.strava.com/api/v3/segments/${segmentID}/leaderboard?access_token=ea0e82c6e8cc3d19a57f22823f175b52062ce456`

class Strava extends Component {
  constructor(props) {
    super(props)
    this.state = {
      segmentData: [],
      leaderData: {
        entries: []
      },
      searchData: []
    }
  }

  getSegment() {
    Axios.get(urlForSegment(this.state.searchData))
      .then((response) => {
        this.setState({segmentData: response.data})
        this.segmentDirection();
      })
    .catch((error)=>{
        console.log(error);
    });
  };

  getLeaderboard() {
    Axios.get(urlForLeaderboard(this.state.searchData))
    .then((response) => {
      this.setState({leaderData: response.data})
    })
    .catch((error)=>{
        console.log(error);
    });
  };

  segmentDirection() {
    const segmentStart = {x: this.state.segmentData.start_latitude, y: this.state.segmentData.start_longitude};
    const segmentEnd = {x: this.state.segmentData.end_latitude, y: this.state.segmentData.end_longitude};
    const segmentBearing = Math.atan2(segmentEnd.y - segmentStart.y, segmentEnd.x - segmentStart.x) * 180 / Math.PI + 90;

    console.log(segmentBearing);

    this.setState({
      segmentBearing: segmentBearing
    });
  }

  buildSegment(event) {
    event.preventDefault();
    this.getLeaderboard();
    this.getSegment();
  }

  handleChange(event) {
    event.preventDefault();
    let value = event.target.value;
    this.setState({
      searchData: value
    })
  }


  render() {
    const divStyle = {
      color: 'blue',
      transform: 'rotateZ(' + this.state.segmentBearing + 'deg)'
    };

    return (
      <div className="search-results-continer">
        <div className="search-segment-name">
        <form className="search-input">
          <input onChange={this.handleChange.bind(this)}/>
          <button onClick={this.buildSegment.bind(this)}>get segment</button>
        </form>
          <h2>{this.state.segmentData.name}</h2>
          <svg style={divStyle} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M22 12l-20 12 5-12-5-12z"/></svg>
        </div>
        <div className="search-segment-name">
          <Map startLat={this.state.segmentData.start_latitude} startLong={this.state.segmentData.start_longitude}></Map>
        </div>
        <div className="search-results">
          <ul>
            {this.state.leaderData.entries.map(item =>
              <li key={item.athlete_name}><div className="segment-info"><span className="segment-time">{secToMin(item.elapsed_time)}</span>{item.athlete_name}</div> <Weather startLat={this.state.segmentData.start_latitude} startLong={this.state.segmentData.start_longitude} time={item.start_date}></Weather></li>
            )}
          </ul>
        </div>
      </div>
    );
  }
}

export default Strava;