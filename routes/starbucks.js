var express = require('express');
var router = express.Router();
var fs = require('fs');

/* GET starbucks listing. */
router.get('/', function(req, res, next) {

    var page = req.param("page", 1);
    var perpage = req.param("perpage", 20);

    var obj = JSON.parse(fs.readFileSync('./public/json/starbucks_new_york.json','utf8'));
    var totalPages = obj.length / perpage;
    if(page > totalPages){
        res.json([]);
        return;
    }
    var start = (page - 1) * perpage;
    var data = obj.slice(start,start + perpage);
    res.json(data);
});

module.exports = router;