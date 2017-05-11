var React = require('react');
var PropTypes = require('prop-types');
var Temperature = require('./Temperature');
var Location = require('./Location');

class Search extends React.Component {
	  /// Capitalize the first letter of a string
  capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }
  
  /// Set an initial state
    constructor(props){
        super(props);
        this.state ={
            location :'London',
            data : {
            	"coord":{"lon":-0.13,"lat":51.51},
            },
        };
        this.handleChange = this.handleChange.bind(this);
        this.formSubmit = this.formSubmit.bind(this);
        this.getData = this.getData.bind(this);
    }
  
  /// Run when we need to get data after input has changed
  getData() {
    var location = this.state.location;
    if (location !== '')
    {
   	var self = this;
    fetch('http://api.openweathermap.org/data/2.5/weather?q=' + location +'&units=metric&appid=31fa0dd5e7db28d97fa13ee9200be5f8').then(function(response) {
        return response.json()
      // console.log(response.json())
      }).then(function(data) {
        self.setState({ data }, () => console.log('self state',self.state));
      });
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
    /**
   * After initial render
   */
  componentWillMount () {
   this.getData();  
  
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
            <Temperature location={this.state.location} locData={this.state.data}/>
        	<Location location={this.state.location} locData={this.state.data}/>
        </div>
        < /div>)
    }
}

module.exports = Search;