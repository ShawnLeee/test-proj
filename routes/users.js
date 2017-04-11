var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.get('/create', function(req, res){
    res.json({'username': 'xiaoao','age':'18'});
});

module.exports = router;
