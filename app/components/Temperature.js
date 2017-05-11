var React = require('react');
var PropTypes = require('prop-types');

class Temperature extends React.Component {

	  /// Set an initial state
    constructor(props){
        super(props);
        this.state ={
             lat:      this.props.locData.coord.lat,
          lon:      this.props.locData.coord.lon,
          // weather:  this.props.locData.weather[0].description,
          location: this.props.locData.name,
          // icon:     'http://openweathermap.org/img/w/' + this.props.locData.weather[0].icon + '.png' /// Messy
        };
        this.updateState = this.updateState.bind(this);
    }

  /**
   * Update state
   */
  updateState (data) {
        this.setState({
          lat:      data.locData.coord.lat || '',
          lon:      data.locData.coord.lon || '',
          weather:  data.locData.weather[0].description || '',
          location: data.locData.name || '',
          temp : data.locData.main.temp,
          temp_max : data.locData.main.temp_max,
          temp_min : data.locData.main.temp_min,
          icon:     'http://openweathermap.org/img/w/' + data.locData.weather[0].icon + '.png' || '' /// Messy
      });
  }

componentWillReceiveProps(nextProps){
    this.updateState(nextProps);
}
	render() {
        return ( < div className="tempArea"> 
        	<div>{this.state.temp}Celcius</div>
        	<div>{this.state.weather}</div>
        	<div><img src={this.state.icon}/></div>
        < /div>)
    }
}

module.exports = Temperature;