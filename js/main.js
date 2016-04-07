//============================================== ver. 2.0  =========================================
var apiKey = "3aa29487f83e54bcc224d7ad20d3fc8e";

function getWeather() {
    var output = document.getElementById("my-status");

    if (!navigator.geolocation) {
        output.innerHTML = "<p>Geolocation is not supported by your browser</p>";
        return;
    }

    function success(position) {
        var lat = position.coords.latitude;
        var lon = position.coords.longitude;

        output.innerHTML = "Have a Nice Day :)";

        $.getJSON("http://api.openweathermap.org/data/2.5/weather?lat=" + lat + "&lon=" + lon + "&units=metric&APPID=" + apiKey, function (data) {
            console.log(data);
            var scale = "C";

            $('#my-city').text(data.name);
            $('#my-temp').text(data.main.temp + " °" + scale);
            $('#my-button').on("click", function () {
                // The algorithm to convert from Celsius to Fahrenheit is the temperature in Celsius times 1.8, plus 32.
                if (scale == "C") {
                    var temp = (data.main.temp * 1.8) + 32;
                    scale = "F";
                    $("#my-toggle").removeClass('fa-toggle-on');
                    $("#my-toggle").toggleClass('fa-toggle-off');
                    return $('#my-temp').text(data.main.temp * 1.8 + 32 + " °" + scale);
                } else {
                    scale = "C";
                    $("#my-toggle").removeClass('fa-toggle-off');
                    $("#my-toggle").toggleClass('fa-toggle-on');
                    return $('#my-temp').text(data.main.temp + " °" + scale);
                }
            });
            $('#my-icon').attr('src', "http://openweathermap.org/img/w/" + data.weather[0].icon + ".png");
            $('#my-description').text("wind " + data.wind.speed + " m/s, " + data.weather[0].description);
        });


        // var img = new Image();
        // img.src = "https://maps.googleapis.com/maps/api/staticmap?center=" + lat + "," + lon + "&zoom=8&size=200x100&sensor=false";
        // output.appendChild(img);
    };

    function error() {
        output.innerHTML = "Unable to retrieve your location";
    };

    output.innerHTML = "<p>Locating… :)</p>";

    navigator.geolocation.getCurrentPosition(success, error);
}

$(document).ready(function () {
    getWeather();
    $("#refresh").on("click", getWeather);
});



