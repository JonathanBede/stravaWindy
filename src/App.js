import React, { Component } from 'react';
import Strava from './Strava';
import Weather from './Weather';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <h1>Strava</h1>
        <Strava></Strava>
        <Weather></Weather>
      </div>
      
    );
  }
}

export default App;
