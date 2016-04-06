//============================================== ver.0.0  =========================================

var apiKey = "3aa29487f83e54bcc224d7ad20d3fc8e";
var lat, lon, city;

jQuery.ajax({
    url: '//freegeoip.net/json/',
    type: 'POST',
    dataType: 'jsonp',
    success: function (location) {
        // example where I update content on the page.
        jQuery('#city').html(location.city);
        jQuery('#region-code').html(location.region_code);
        jQuery('#region-name').html(location.region_name);
        jQuery('#areacode').html(location.areacode);
        jQuery('#ip').html(location.ip);
        jQuery('#zipcode').html(location.zipcode);
        jQuery('#longitude').html(location.longitude);
        jQuery('#latitude').html(location.latitude);
        jQuery('#country-name').html(location.country_name);
        jQuery('#country-code').html(location.country_code);

        lat = location.latitude;
        lon = location.longitude;
        city = location.city;
    }
});


function getWeather() {
    $.getJSON("http://api.openweathermap.org/data/2.5/weather?lat=" + lat + "&lon=" + lon + "&APPID=" + apiKey, function (data) {
        console.log(data);

        // var text = encodeURIComponent(data.quoteText);

        $('#my-location').text(data.coord.lon + " --- " + data.coord.lat);
        $('#my-temp').text(data.main.temp);
        $('#my-icon').attr('src', "http://openweathermap.org/img/w/" + data.weather[0].icon + ".png");
        $('#city').text(data.name);

    });
}

$(document).ready(function () {
    getWeather();
});



