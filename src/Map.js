import React, { Component } from 'react';
import ReactDOM from 'react-dom'

export class Map extends Component {
  constructor(props) {
    super(props)
  }

    componentDidMount() {
        this.loadMap();
      }

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.google !== this.props.google) {
          this.loadMap();
        }
      }

      loadMap() {
        if (this.props && this.props.google) {
          // google is available
          const {google} = this.props;
          const maps = google.maps;

          const mapRef = this.refs.map;
          const node = ReactDOM.findDOMNode(mapRef);

          let zoom = 14;
          let lat = this.props.startLat;
          let lng = this.props.startLong;
          const center = new maps.LatLng(lat, lng);
          const mapConfig = Object.assign({}, {
            center: center,
            zoom: zoom
          })
          this.map = new maps.Map(node, mapConfig);
        }
      }
    

    render() {
      return (
        <div ref='map'style={{width:100+'%', height:100+'%', position:'absolute'}} >
          Loading map...
        </div>
      )
    }
  }

  export default Map;