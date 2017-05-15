var React = require('react');
var PropTypes = require('prop-types');
var Search = require('./Search');

class App extends React.Component {
	render() {
        return ( < div className="appComponent"> 
        	        	<Search/>
               < /div>)
    }
}

module.exports = App;