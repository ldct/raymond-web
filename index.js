var express = require('express');
var app = express();
var http = require('http');

var server = http.createServer(app);
var bodyParser = require('body-parser');
var morgan = require('morgan');

app.use(bodyParser.json({ 'limit': '10mb' }));
app.use(morgan('dev'));

var gVision = require('./gvision');

app.use(express.static('static'));

app.get('/ocr/receipt', function (req, resp) {
  gVision.identifyImage("gs://raymond-images/receipt.JPG", function (err, res) {
    if (err) return console.log(err);
    console.log(JSON.stringify(res));
    return resp.json(res);
  });  
});

var port = +process.argv[2] || 3000;
server.listen(port, function() {

  var host = server.address().address;
  var port = server.address().port;

  console.log('raymond-web listening at http://%s:%s', host, port);

});