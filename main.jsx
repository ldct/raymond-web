var React = require('react');
var ReactDOM = require('react-dom');

var App = React.createClass({
  render: function () {
    return <div> hi </div>
  }
});

ReactDOM.render(
  <App />,
  document.getElementById('container')
);