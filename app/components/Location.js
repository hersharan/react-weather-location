var React = require('react');
var PropTypes = require('prop-types');
var withGoogleMap, GoogleMap, Marker = require('react-google-maps');

class Location extends React.Component {
/// Google Map Vars


/// Config for the app setup

	  /// Set an initial state
    constructor(props){
        super(props);
        this.state ={
            lat : this.props.locData.coord.lat ,
            lng : this.props.locData.coord.lng,
            map: new google.maps.Map(document.getElementById('map'), {
      zoom: 10,
      disableDefaultUI: true,
      zoomControl: true
    }),
marker:new google.maps.Marker({
      map: map,
      draggable: true
    }),
mapZoomLevel:'',
            config : {
  initialLat: this.props.locData.coord.lat,
  initialLon: this.props.locData.coord.lng,
  mapZoomLevel: 10
}
        };
        this.renderMap = this.renderMap.bind(this);
        this.updateMap = this.updateMap.bind(this);
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
    this.setState({
    map : new google.maps.Map(document.getElementById('map'), {
      zoom: this.state.config.mapZoomLevel,
      disableDefaultUI: true,
      zoomControl: true
    }),
  
    /// Create a new marker
    marker : new google.maps.Marker({
      map: map,
      draggable: true
    })
    });
    /// Set the initial pin drop animation
    console.log('pin drop init',this.state.marker);
    this.state.marker.setAnimation(google.maps.Animation.DROP);
  
    /// Add an event listener for click
    google.maps.event.addListener(this.state.map, 'click', function(event) {
      var latLng = event.latLng;
      var lat = latLng.lat();
      var lng = latLng.lng();
      
      /// Update state based on lat lon
      this.updateState(null, lat, lng)
    }.bind(this));
    
    /// Add an event listener for drag end
    google.maps.event.addListener(this.state.marker, 'dragend', function(event) {
      
      var latLng = event.latLng;
      var lat = latLng.lat();
      var lng = latLng.lng();
      /// Update state based on lat lon
      this.updateState(null, lat, lng)
    }.bind(this));
    
    /// Update variable on map change
    this.state.map.addListener('zoom_changed', function() {
      this.setState({mapZoomLevel : this.state.map.getZoom()});
    });
  }
  
  /**
   * Set map marker position and pan settings
   */
  updateMap(lat, lon) {

    var latLng = new google.maps.LatLng(this.state.lat, this.state.lon);
    
    /// Set a timeout before doing map stuff
    window.setTimeout( function() {
      
      /// Set the marker position
      this.state.marker.setPosition(latLng);
      
      /// Pan map to that position
      this.state.map.panTo(latLng);
    }.bind(this), 300);
  }
  
  /**
   * After initial render
   */
  componentDidMount () {
    
    /// Render a new map
    this.renderMap(this.props.locData.coord.lat,this.props.locData.coord.lng);
    
    /// Run update state, passing in the setup
    // this.updateState(null, this.state.lat, this.state.lon);
  }
  componentWillReceiveProps(nextProps){
    this.updateMap(this.props.locData.coord.lat,this.props.locData.coord.lng);
}
  /**
   * Render the app
   */
	render() {
        return ( < div className="locArea" id="map"> 
        	Location 
        	{this.props.location}
        	{this.props.locData.coord.lat}
        	{this.props.locData.coord.lon}
        </div>)
    }
}

module.exports = Location;