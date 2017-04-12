var currentPage = 0;
$(document).ready(function(){
    // var currentLocation = {latitude: 40.743827, longitude: -73.989015};
    // var sortedData = getStarbuckList(function(data){
    //     newdata = data.map(function(ele){
    //         var distanceToCurrentLocation = distance(currentLocation, ele.location);
    //         ele["distance"] = distanceToCurrentLocation;
    //         return ele;
    //     });
    //     newdata.sort(function(elea, eleb){
    //         return elea.distance - eleb.distance;
    //     });

    //     newdata.forEach(function(data){
    //         var starbuckCell = new Starbuck(data);
    //         starbuckCell.appendTo("body");
    //     });

    // });
    // getStarbuckList(1, function(data){
    //     setData(data);
    // });
    setDropLoad();
});
function setData(data){
    data.forEach(function(ele){
        var starbuckCell = new Starbuck(ele);
        starbuckCell.appendTo("#maincontainer");
    });
}
function setDropLoad()
{
    $("#maincontainer").dropload({
        scrollArea: window,
        loadDownFn: function(me){
            getStarbuckList(currentPage + 1, function(data){
                setData(data);
                me.resetload();
            });
        },
        loadUpFn: function(me){
            me.resetload();
        }
    });
}
function getStarbuckList(page, callback){
    $.ajax({
        url: "http://localhost:3000/starbucks",
        type: "GET",
        data: {"page":page},
        contentType: "application/x-www-form-urlencoded; charset=utf-8",
        dataType: "json",
        success: function(data){
            if(data.length == 0){
                return;
            }
            callback(data);
            currentPage = page;
        }
    });
}

function Starbuck(data){
    var starId = "starbuck-" + data.id;
    var starbuckCell = $('<div>').attr("id", starId).addClass("starbuck-cell");
    var starbuckImg = $("<a>").addClass("fleft").appendTo(starbuckCell);
    $("<img>").addClass("starbuck-logo").attr("src","images/starbucks-logo.png").appendTo(starbuckImg);
    var storeMessage = $("<div>").addClass("fleft").addClass("storemessage").appendTo(starbuckCell);
    var starname = $("<div>").appendTo(storeMessage);
    $("<h1>").addClass("storename").text(data.name).appendTo(starname);

    var location = $("<div>").addClass("location").appendTo(storeMessage);
    var address = data.street + '  ' + data.city;
    //map address
    var mapaddress = 'http://m.amap.com/navi/?dest='+data.location.latitude + ',' + data.location.longitude + '&destName=' + data.name + '&hideRouteIcon=1&key=85eb92c0e8b2f661e9fce2b29e0175c1';
    var addressView = $("<a>").text(address).attr("href",mapaddress).appendTo(location);
    $("<img>").attr("src", "images/bg.png").appendTo(addressView);

    $("<div>").addClass("clearfloat").addClass("divider").appendTo(starbuckCell);

    return starbuckCell;
}
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





