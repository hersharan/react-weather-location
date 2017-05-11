var React = require('react');
var PropTypes = require('prop-types');
var Temperature = require('./Temperature');
var Location = require('./Location');

class Search extends React.Component {
	  /// Capitalize the first letter of a string
  // capitalizeFirstLetter: function(string) {
  //   return string.charAt(0).toUpperCase() + string.slice(1);
  // },
  
  /// Set an initial state
    constructor(props){
        super(props);
        this.state ={
            location :'Bristol'
        };
        this.handleChange = this.handleChange.bind(this);
        this.formSubmit = this.formSubmit.bind(this);
        this.getData = this.getData.bind(this);
    }
   /// Use jQuery Ajax to get some data
  // loadData: function (location) {
  //   return $.get('http://api.openweathermap.org/data/2.5/weather?q=' + location);
  // },
  
  /// Set the state after loading data from the API
  // setStateWithData: function (location) {
  //   this.loadData(location).then( function (data) {      
  //     this.setState({
  //        weather: this.capitalizeFirstLetter( data.weather[0].description ),
  //        location: data.name
  //     });
  //   }.bind(this));
  // },
  
  /// After initial render
  // componentDidMount: function () {
  //   /// Pass in the initial state to get the initial weather
  //   this.setStateWithData(this.state.location);
  // },
  
  /// Run when we need to get data after input has changed
  getData() {
    var location = this.refs.newLocation.value;
    if (location !== '')
    {
    	    var self = this;
    fetch('http://samples.openweathermap.org/data/2.5/weather?q=' + location +'&appid=b1b15e88fa797225412429c1c50c122a1').then(function(response) {
        // return response.json()
      console.log(response.json())
      });
    // .then(function(data) {
    //     self.setState({ data }, () => console.log(self.state));
    //   });

    //   this.setStateWithData(location);
    // console.log('in getData',location);
    }
  }
  handleChange(e){
  	this.setState({
             location : e.target.value   
        });
  }
  /// Run when the form is submitted
  formSubmit(e) {
    e.preventDefault();
    /// Clear the input
    this.refs.newLocation.value = '';
  }
	render() {
        return ( < div className="searchArea"> 
        	        <div className="panel panel-default text-center">
          <div className="panel-body">
            <form className="form-inline" onSubmit={this.formSubmit}>
                <div className="input-group">
                  <input type="text" value={this.state.location} className="form-control" placeholder="Enter a city name" ref="newLocation" required onChange={ this.handleChange }/>
                  <span className="input-group-btn">
                    <button type="submit" className="btn btn-success" onClick={this.getData}>Search</button>
                  </span>
                </div>
            </form>
          </div>
        </div>
        <div className="flex-center">
            <Temperature location={this.state.location}/>
        	<Location location={this.state.location}/>
        </div>
        < /div>)
    }
}

module.exports = Search;