var fs = require('fs');

const CLOUD_VISION_API_SECRET = fs.readFileSync('CLOUD_VISION_API_SECRET', 'utf8').split('\n')[0]

var request = require('request');

exports.identifyImage = function (gcsUrl, cb) {
  request({
    url: "https://vision.googleapis.com/v1/images:annotate",
    method: "POST",
    qs: {
      key: CLOUD_VISION_API_SECRET
    },
    json: true,
    body: {
      requests: [{
        image: {
            source: {
              gcsImageUri: gcsUrl
            }
        },
        features: [{
          type: 'TEXT_DETECTION',
        }]
      }]
    }
  }, function (err, res) {
    if (err) return cb(err);
    return cb(null, res.body.responses[0].textAnnotations);
  });
}