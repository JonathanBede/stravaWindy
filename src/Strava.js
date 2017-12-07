import React, { Component } from 'react';
import Axios from 'axios';

import './App.css';

class Strava extends Component {

componentDidMount() {
  Axios.get('https://www.strava.com/api/v3/segments/12064511/leaderboard?access_token=ea0e82c6e8cc3d19a57f22823f175b52062ce456')

    .then(function (response) {
        console.log(response);
    });
};


  render() {
    return (
      <div>Strava</div>
    );
  }
}

export default Strava;