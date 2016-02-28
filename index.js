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

app.get('/ocr/receipt', function (req, res) {
  // gVision.identifyImage("gs://raymond-images/receipt.JPG", function (err, res) {
  //   console.log(JSON.stringify(res.body.responses[0].textAnnotations));
  // });  
  return res.json([{"locale":"en","description":"CREDIT CARD VOUCHER\nANY RESTAURANT\nANYWhHERE\n(69) 69696969\nDATE\n02/02/2014\nTIME.\nCARD TYPE\nMC\nACCT\nTRANS KEY:\nHYU87 89798234\nAUTH CODE:\n12345\nEXP DATE:\nCHECK:\nTABLE\nSERVER\n34 MONIKA\nSubtotal\n$1969.69\nGratuity:\nTotal\nSignature:\nCustomer Copy\n","boundingPoly":{"vertices":[{"x":299,"y":372},{"x":1306,"y":372},{"x":1306,"y":2735},{"x":299,"y":2735}]}}])
});

var port = +process.argv[2] || 3000;
server.listen(port, function() {

  var host = server.address().address;
  var port = server.address().port;

  console.log('sdict listening at http://%s:%s', host, port);

});