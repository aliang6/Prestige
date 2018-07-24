const express = require('express');
const router = express.Router();
const request = require('request');

var aylienUrl = 'https://api.aylien.com/api/v1/extract'
var headers = {
  'X-AYLIEN-TextAPI-Application-Key': 'bf5aeee4471987b6eb3bc5aa7b660015',
  'X-AYLIEN-TextAPI-Application-ID': '7d23624c',
};
var form = {
  'url': 'https://www.cnet.com/roadshow/auto/2018-tesla-model-3-performance/preview/',
  'best_image': 'true',
  'language': 'auto',
}


/* GET users listing. */
router.get('/', (req, res, next) => {
  res.send('respond with a resource');
});

router.post('/', (req, res) => {
  request.post({ url: aylienUrl, form, headers}, (err, res, body) => {
    console.log(body);
  });
  res.render('index');
});

module.exports = router;
