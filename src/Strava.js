import React, { Component } from 'react';
import Axios from 'axios';
import Weather from './Weather';

const testID = 12064511

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

    }
  }

  getSegment() {
    Axios.get(urlForSegment(testID))
      .then((response) => {
        this.setState({segmentData: response.data})
        this.segmentDirection();
      })
    .catch((error)=>{
        console.log(error);
    });
  };

  getLeaderboard() {
    Axios.get(urlForLeaderboard(testID))
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

  componentDidMount() {
    this.getLeaderboard();
    this.getSegment();
  }


  render() {
    return (
      <div className="search-results-continer">
        <div className="search-segment-name">{this.state.segmentData.name} - {this.state.segmentBearing}</div>
        <div className="search-segment-name">map</div>
        <div className="search-results">
          <ul>
            {this.state.leaderData.entries.map(item =>
              <li key={item.athlete_name}>{item.athlete_name} - {item.elapsed_time} - <Weather startLat={this.state.segmentData.start_latitude} startLong={this.state.segmentData.start_longitude} time={item.start_date}></Weather></li>
            )}
          </ul>
        </div>
      </div>
    );
  }
}

export default Strava;