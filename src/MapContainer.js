import React, { Component } from 'react';
import {GoogleApiWrapper} from 'google-maps-react';

import Map from './Map';

export class MapContainer extends Component {
  constructor(props) {
    super(props)
  }

    render() {
      if (!this.props.loaded) {
        return <div>Loading...</div>
      }

      return (       
            <Map google={this.props.google} startLat={this.props.startLat} startLong={this.props.startLong} />
      )
    }
  }
  
  export default GoogleApiWrapper({
    apiKey: 'AIzaSyAyesbQMyKVVbBgKVi2g6VX7mop2z96jBo'
  })(MapContainer)
