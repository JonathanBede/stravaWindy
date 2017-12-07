import React, { Component } from 'react';
import Strava from './Strava';
import Weather from './Weather';
import 'normalize.css';
import './App.css';


class App extends Component {
  render() {
    return (
      <div className="App">
        <header><h1>Strava Weather</h1></header>
        <Strava></Strava>
        <Weather></Weather>
      </div>
      
    );
  }
}

export default App;
