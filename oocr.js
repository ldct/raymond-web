const request = require('request');
const fs = require('fs');

const OXFORD_OCR_API_SECRET = fs.readFileSync('OXFORD_OCR_API_SECRET', 'utf8').split('\n')[0]

exports.identifyImage = function (url, cb) {
  request({
    url: 'https://api.projectoxford.ai/vision/v1/ocr',
    method: "POST",
    qs: {
      language: "unk",
      detectOrientation: true,
    },
    json: true,
    headers: {
      'Ocp-Apim-Subscription-Key': OXFORD_OCR_API_SECRET
    },
    body: {
      Url: url
    }
  }, function (err, res) {
    if (err) return cb(err);
    return cb(null, res.body.regions);
  });
};