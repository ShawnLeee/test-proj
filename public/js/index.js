$(document).ready(function(){
    if("geolocation" in navigator){
        navigator.geolocation.getCurrentPosition(function(position) {
            console.log(position.coords.latitude, position.coords.longitude);
            start = '' + position.coords.latitude + ',' + position.coords.longitude;
            // desturl = 'http://m.amap.com/navi/?start=' + start + '&dest=116.470098,39.992838&destName=阜通西&key=85eb92c0e8b2f661e9fce2b29e0175c1';
            // posurl = 'http://m.amap.com/navi/?dest=116.470098,39.992838&destName=阜通西&key=85eb92c0e8b2f661e9fce2b29e0175c1';
            posurl = 'http://m.amap.com/navi/?dest=' + start + '&destName=阜通西&key=85eb92c0e8b2f661e9fce2b29e0175c1';

            desturl = 'http://m.amap.com/navi/?start=116.403124,39.940693&dest=116.481488,39.990464&destName=一条驾车路线&key=85eb92c0e8b2f661e9fce2b29e0175c1';
            console.log(posurl);
            window.open(posurl);
        });
    }
});

function getStarbuckList(callback){
    $.ajax({
        url: "http://localhost:3000/starbucks",
        type: "GET",
        contentType: "application/x-www-form-urlencoded; charset=utf-8",
        dataType: "json",
        success: function(data){
            callback(data);
        }
    });
}

function Starbuck(data){

}