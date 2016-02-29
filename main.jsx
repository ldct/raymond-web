var React = require('react');
var ReactDOM = require('react-dom');

var gcsFullUrl = function (filename) {
  return "http://storage.googleapis.com/raymond-images/" + filename;
};

var ImageWithBB = React.createClass({
  render: function () {
    var self = this;

    var lines = [];
    var ratio = 500 / self.props.originalWidth

    self.props.regions.forEach(function (region) {
      region.lines.forEach(function (line) {
        lines.push(line);
      });
    });

    console.log(lines);

    return <div>
      <div style={{
        position: 'relative',
        top: '10px'
      }}>
        {self.props.regions.map(function (region) {
          var bb = region.boundingBox.split(',');

          var topLeftX = parseInt(bb[0], 10);
          var topLeftY = parseInt(bb[1], 10);
          var width = parseInt(bb[2], 10);
          var height = parseInt(bb[3], 10);

          return <pre
            style={{
              position: 'absolute',
              zIndex: 2,
              margin: 0,
              left: ratio * topLeftX,
              top: ratio * topLeftY,
              height: ratio * height,
              width: ratio * width,
              backgroundColor: 'rgba(0, 100, 20, 0.5)',
            }}>
            </pre>
        })}
        {lines.map(function (line) {
          var bb = line.boundingBox.split(',');

          var topLeftX = parseInt(bb[0], 10);
          var topLeftY = parseInt(bb[1], 10);
          var width = parseInt(bb[2], 10);
          var height = parseInt(bb[3], 10);
          return <pre
            style={{
              position: 'absolute',
              zIndex: 3,
              margin: 0,
              left: ratio * topLeftX,
              top: ratio * topLeftY,
              height: ratio * height,
              width: ratio * width,
              backgroundColor: 'rgba(0, 100, 20, 0.5)'
            }}>
            </pre>  
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
        hi
      </div>
    </div>
  }
});

var App = React.createClass({
  getInitialState: function () {
    return {
      regions: []
    };
  },
  handleClickRunOcr: function () {
    var self = this;
    $.get('/ocr/manga', function (res, err) {
      self.setState({
        regions: res
      });
    });
  },
  render: function () {
    return <div>
      <button onClick={this.handleClickRunOcr}>Run OCR</button>
      <ImageWithBB 
        filename='manga.jpg'
        regions={this.state.regions}
        originalWidth={800}
      ></ImageWithBB>
    </div>
  }
});

ReactDOM.render(
  <App />,
  document.getElementById('container')
);