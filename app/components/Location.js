var React = require('react');
var PropTypes = require('prop-types');
import GoogleMapReact from 'google-map-react';
const AnyReactComponent = ({ text }) => <div className="map-pin">{text}</div>;


/// Google Map Vars
var map;
var marker;
var mapZoomLevel;

/// Config for the app setup
var config = {
  initialLat: 51.75,
  initialLon: -3.38,
  mapZoomLevel: 10
}

class Location extends React.Component {



/// Config for the app setup

	  /// Set an initial state
    constructor(props){
        super(props);
        this.state ={
    center: {lat: this.props.locData.coord.lat, lon: this.props.locData.coord.lon},
    zoom: 11
  };
  this.locationSearch = this.locationSearch.bind(this);
  this.geolocationSearch = this.geolocationSearch.bind(this);
  this.renderMap = this.renderMap.bind(this);
  this.updateMap = this.updateMap.bind(this);
}



  /**
   * Run when 'search' button is pressed
   */
  locationSearch () {
    
    /// Get the value from the search field
    var location = this.props.location;
    
    if ( location !== '' )
    {
      /// Update state with new API Data based on location name
      this.updateState(location, null, null);
    }
  }
  
  /**
   * Run when 'location' button is used
   */
  geolocationSearch() {
    
    /// Successful geolocation
    var success = function (position) {
      var lat = position.coords.latitude;
      var lon = position.coords.longitude;
      
      /// Update state with new API Data based on lat lon
      this.updateState(null, lat, lon);
    }.bind(this);
  
    /// Error'd geolocation
    var error = function (error) {
      if (error.message == 'User denied Geolocation')
      {
        alert('Please enable location services');
      }
    };
    
    /// Get the position
    navigator.geolocation.getCurrentPosition(success, error);
  }


  /**
   * Render the map on the page
   */
  renderMap(lat, lng) {

    /**
     * Map coordinates and pin coordinates are added in updateMap(),
     * which is run by updateStateWithData()
     */
    
    /// Create a new map
    map = new google.maps.Map(document.getElementById('map'), {
      zoom: config.mapZoomLevel,
      disableDefaultUI: true,
      zoomControl: true
    });
  
    /// Create a new marker
    marker = new google.maps.Marker({
      map: map,
      draggable: true
    });
    
    /// Set the initial pin drop animation
    marker.setAnimation(google.maps.Animation.DROP);
  
    /// Add an event listener for click
    google.maps.event.addListener(map, 'click', function(event) {
      var latLng = event.latLng;
      var lat = latLng.lat();
      var lng = latLng.lng();
      
      /// Update state based on lat lon
      this.updateState(null, lat, lng)
    }.bind(this));
    
    /// Add an event listener for drag end
    google.maps.event.addListener(marker, 'dragend', function(event) {
      
      var latLng = event.latLng;
      var lat = latLng.lat();
      var lng = latLng.lng();
      /// Update state based on lat lon
      this.updateState(null, lat, lng)
    }.bind(this));
    
    /// Update variable on map change
    map.addListener('zoom_changed', function() {
      mapZoomLevel = map.getZoom();
    });
  }
  
  /**
   * Set map marker position and pan settings
   */
  updateMap(lat, lon) {
    console.log('in update map',lat ,lon);
    var latLng = new google.maps.LatLng(lat,lon);
    
    /// Set a timeout before doing map stuff
    window.setTimeout( function() {
      
      /// Set the marker position
      marker.setPosition(latLng);
      
      /// Pan map to that position
      map.panTo(latLng);
    }.bind(this), 300);
  }
  
//   /**
//    * After initial render
//    */
  componentDidMount () {
    
    /// Render a new map
    this.renderMap(this.props.locData.coord.lat,this.props.locData.coord.lon);
    
    /// Run update state, passing in the setup
    // this.updateState(null, this.state.lat, this.state.lon);
  }
  componentWillReceiveProps(nextProps){
  	console.log('componentWillReceiveProps',nextProps);
    this.updateMap(nextProps.locData.coord.lat,nextProps.locData.coord.lon);
}        
  /**
   * Render the app
   */
	render() {
        return ( 
        	< div className="locArea" id="map">
      </div>
        )
    }
}

module.exports = Location;