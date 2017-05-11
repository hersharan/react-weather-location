var React = require('react');
var PropTypes = require('prop-types');

class Location extends React.Component {
	render() {
        return ( < div className="locArea"> 
        	Location 
        	{this.props.location}
        < /div>)
    }
}

module.exports = Location;