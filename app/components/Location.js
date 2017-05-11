var React = require('react');
var PropTypes = require('prop-types');
import GoogleMapReact from 'google-map-react';
const AnyReactComponent = ({ text }) => <div className="map-pin">{text}</div>;

class Location extends React.Component {
/// Google Map Vars


/// Config for the app setup

	  /// Set an initial state
      constructor(props){
        super(props);
        this.state ={
    center: {lat: this.props.locData.coord.lat, lng: this.props.locData.coord.lon},
    zoom: 11
  }
}
//       /**
//    * Render the map on the page
//    */
//   renderMap(lat, lng) {

//     /**
//      * Map coordinates and pin coordinates are added in updateMap(),
//      * which is run by updateStateWithData()
//      */
    
//     /// Create a new map
//     this.setState({
//     map : new google.maps.Map(document.getElementById('map'), {
//       zoom: this.state.config.mapZoomLevel,
//       disableDefaultUI: true,
//       zoomControl: true
//     }),
  
//     /// Create a new marker
//     marker : new google.maps.Marker({
//       map: map,
//       draggable: true
//     })
//     });
//     /// Set the initial pin drop animation
//     console.log('pin drop init',this.state.marker);
//     this.state.marker.setAnimation(google.maps.Animation.DROP);
  
//     /// Add an event listener for click
//     google.maps.event.addListener(this.state.map, 'click', function(event) {
//       var latLng = event.latLng;
//       var lat = latLng.lat();
//       var lng = latLng.lng();
      
//       /// Update state based on lat lon
//       this.updateState(null, lat, lng)
//     }.bind(this));
    
//     /// Add an event listener for drag end
//     google.maps.event.addListener(this.state.marker, 'dragend', function(event) {
      
//       var latLng = event.latLng;
//       var lat = latLng.lat();
//       var lng = latLng.lng();
//       /// Update state based on lat lon
//       this.updateState(null, lat, lng)
//     }.bind(this));
    
//     /// Update variable on map change
//     this.state.map.addListener('zoom_changed', function() {
//       this.setState({mapZoomLevel : this.state.map.getZoom()});
//     });
//   }
  
//   /**
//    * Set map marker position and pan settings
//    */
  updateMap(data) {

            this.setState({
              center: {lat: data.locData.coord.lat, lng: data.locData.coord.lon},
    zoom: 11
      });
  }
  
//   /**
//    * After initial render
//    */
//   componentDidMount () {
    
//     /// Render a new map
//     this.renderMap(this.props.locData.coord.lat,this.props.locData.coord.lng);
    
//     /// Run update state, passing in the setup
//     // this.updateState(null, this.state.lat, this.state.lon);
//   }
  componentWillReceiveProps(nextProps){
  	console.log(nextProps);
    this.updateMap(nextProps);
}        
  /**
   * Render the app
   */
	render() {
        return ( 
        	< div className="locArea" id="map">
        	      <GoogleMapReact
        defaultCenter={this.state.center}
        defaultZoom={this.state.zoom}
      >
        <AnyReactComponent
          lat={this.props.locData.coord.lat}
          lng={this.props.locData.coord.lon}
          text={this.props.location}
        />
      </GoogleMapReact>
      </div>
        )
    }
}

module.exports = Location;