var React = require('react');
var ReactDOM = require('react-dom');

var imageName = 'receipt.JPG';

var gcsFullUrl = function (filename) {
  return "http://storage.googleapis.com/raymond-images/" + filename;
};

var ImageWithBB = React.createClass({
  render: function () {
    var self = this;
    return <div>
      <div style={{
        position: 'relative',
        top: '10px'
      }}>
        {self.props.annotations.map(function (annotation) {
          var vertices = annotation.boundingPoly.vertices;
          var topLeft = vertices[0];
          var bottomRight = vertices[2];
          var ratio = 500 / self.props.originalWidth

          return <pre
            style={{
              position: 'absolute',
              zIndex: 2,
              margin: 0,
              left: ratio * topLeft.x,
              top: ratio * topLeft.y,
              height: ratio * (bottomRight.y - topLeft.y),
              width: ratio * (bottomRight.x - topLeft.x),
              backgroundColor: 'rgba(0, 100, 20, 0.5)',
              color: 'rgba(0, 100, 20, 0.7)'
            }}></pre>
        })}
        <img
          src={gcsFullUrl(this.props.filename)}
          style={{
            position: 'absolute',
            width: 500,
            top: 0,
            left: 0,
            zIndex: 1
          }}
        ></img>
      </div>
      <div style={{
        marginLeft: 500
      }}>
        {self.props.annotations.map(function (annotation) {
          return <pre>{annotation.description}</pre>
        })}
      </div>
    </div>
  }
});

var App = React.createClass({
  getInitialState: function () {
    return {
      annotations: []
    };
  },
  handleClickRunOcr: function () {
    var self = this;
    $.get('/ocr/receipt', function (res, err) {
      self.setState({
        annotations: res
      });
    });
  },
  render: function () {
    return <div>
      <button onClick={this.handleClickRunOcr}>Run OCR</button>
      <ImageWithBB 
        filename='receipt.JPG'
        annotations={this.state.annotations}
        originalWidth={1691}
      ></ImageWithBB>
    </div>
  }
});

ReactDOM.render(
  <App />,
  document.getElementById('container')
);