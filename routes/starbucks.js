var express = require('express');
var router = express.Router();
var fs = require('fs');

/* GET starbucks listing. */
router.get('/', function(req, res, next) {
    
    var page = req.param("page", 1);
    var perpage = req.param("perpage", 20);
    // load local json data
    var obj = JSON.parse(fs.readFileSync('./public/json/starbucks_new_york.json','utf8'));

    //sort starbucks by the distance to the user's current location,
    // if not provide the location,then do nothing 
    var userlatitue = req.param('latitude', 0);
    var userlongitude = req.param('longitude', 0);

    var resdata = [];

    if(userlatitue != "undefined" && userlongitude != "undefined"){
        var currentLocation = {"latitude": userlatitue, "longitude": userlongitude};
        newdata = obj.map(function(ele){
            var distanceToCurrentLocation = distance(currentLocation, ele.location);
            ele["distance"] = distanceToCurrentLocation;
            return ele;
        });
        newdata.sort(function(elea, eleb){
            return elea.distance - eleb.distance;
        });
        resdata = newdata;
    }


    var totalPages = resdata.length / perpage;
    if(page > totalPages){
        res.json([]);
        return;
    }
    var start = (page - 1) * perpage;
    var data = resdata.slice(start,start + perpage);
    res.json(data);
});

/**
 * Caculate the distance between two coordinate
 */

function distance(coordinateX, coordinateY){
    var lat1 = coordinateX.latitude;
    var lng1 = coordinateX.longitude;
    var lat2 = coordinateY.latitude;
    var lng2 = coordinateY.longitude;
    var radLat1 = lat1 * Math.PI / 180.0;
    var radLat2 = lat2 * Math.PI / 180.0;
    var a = radLat1 - radLat2;
    var b = lng1 * Math.PI / 180.0 - lng2 * Math.PI / 180.0;
    var s = 2 * Math.asin(Math.sqrt(Math.pow(Math.sin(a / 2), 2) + Math.cos(radLat1) * Math.cos(radLat2) * Math.pow(Math.sin(b / 2), 2)));
    s = s * 6378.137;
    s = Math.round(s * 10000) / 10000;
    return s;
}

module.exports = router;