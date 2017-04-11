var express = require('express');
var router = express.Router();
var fs = require('fs');

/* GET starbucks listing. */
router.get('/', function(req, res, next) {
    console.log(req.query.page);
    var obj = JSON.parse(fs.readFileSync('./public/json/starbucks_new_york.json','utf8'));
    res.json(obj);
});

module.exports = router;