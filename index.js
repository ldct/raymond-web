var express = require('express');
var app = express();
var http = require('http');

var server = http.createServer(app);
var bodyParser = require('body-parser');
var morgan = require('morgan');

app.use(bodyParser.json({ 'limit': '10mb' }));
app.use(morgan('dev'));

var gVision = require('./gvision');
var oOcr = require('./oocr');

app.use(express.static('static'));

app.get('/ocr/receipt', function (req, resp) {
  oOcr.identifyImage("http://storage.googleapis.com/raymond-images/receipt.JPG", function (err, res) {
    if (err) return console.log(err);
    return resp.json(res);
  });
});

app.get('/ocr/manga', function (req, resp) {
  oOcr.identifyImage("http://storage.googleapis.com/raymond-images/manga.jpg", function (err, res) {
    if (err) return console.log(err);
    return resp.json(res);
  });
});

var port = +process.argv[2] || 3000;
server.listen(port, function() {

  var host = server.address().address;
  var port = server.address().port;

  console.log('raymond-web listening at http://%s:%s', host, port);

});