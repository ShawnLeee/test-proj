var currentPage = 0;
$(document).ready(function(){
    var currentLocation = {latitude: 40.743827, longitude: -73.989015};
    if ("geolocation" in navigator) {
    /* user location available */
        navigator.geolocation.getCurrentPosition(function(position){
            currentLocation.latitude = position.coords.latitude;
            currentLocation.longitude = position.coords.longitude;
        });
    }
    setDropLoad(currentLocation);
});
function setData(data){
    data.forEach(function(ele){
        var starbuckCell = new Starbuck(ele);
        starbuckCell.appendTo("#maincontainer");
    });
}
function setDropLoad(userLocation)
{
    $("#maincontainer").dropload({
        scrollArea: window,
        loadDownFn: function(me){
            var params = {page:currentPage + 1, latitude:userLocation.latitude, longitude:userLocation.longitude};
            getStarbuckList(params, function(data){
                setData(data);
                me.resetload();
            });
        },
        loadUpFn: function(me){
            me.resetload();
        }
    });
}
function getStarbuckList(params, callback){
    $.ajax({
        url: "http://localhost:3000/starbucks",
        type: "GET",
        data: params,
        contentType: "application/x-www-form-urlencoded; charset=utf-8",
        dataType: "json",
        success: function(data){
            if(data.length == 0){
                return;
            }
            callback(data);
            currentPage = params.page;
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






