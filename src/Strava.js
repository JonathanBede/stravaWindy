import React, { Component } from 'react';
import Axios from 'axios';

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
      }
    }
  }

  getSegment() {
    Axios.get(urlForSegment(testID))
      .then((response) => {
        this.setState({segmentData: response.data})
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
  console.log(this.state.leaderData);
  };

  componentDidMount() {
    this.getLeaderboard();
    this.getSegment();
  }


  render() {
    return (
      <div className="search-results-continer">
        <div className="search-segment-name">{this.state.segmentData.name}</div>
        <div className="search-results">
          <ul>
            {this.state.leaderData.entries.map(item =>
              <li key={item.athlete_name}>{item.athlete_name} - {item.elapsed_time}</li>
            )}
          </ul>
        </div>
      </div>
    );
  }
}

export default Strava;