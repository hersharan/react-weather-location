var React = require('react');
var PropTypes = require('prop-types');
var Search = require('./Search');
var Temperature = require('./Temperature');
var Location = require('./Location');

class App extends React.Component {
	render() {
        return ( < div className="appComponent"> 
        	<div className="flex-center">
        	<Search/>
        	</div>
        	<div className="flex-center">
        	<Temperature/>
        	<Location/>
        	</div>
        < /div>)
    }
}

module.exports = App;