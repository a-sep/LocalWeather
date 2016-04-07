// Weather Icons is maintained by Erik Flowers. Reach me at @Erik_UX or at http://www.helloerik.com.
//============================================== ver. 3.0  =========================================
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
            $("#my-toggle").removeClass('fa-toggle-off');
            $("#my-toggle").addClass('fa-toggle-on');
            console.log(data);
            var scale = "C";
            var tempF = (data.main.temp * 1.8 + 32).toFixed(1);
            var tempC = data.main.temp.toFixed(1);

            $('#my-city').text(data.name);
            $("#my-weather-icon").addClass('wi-owm-'+ data.weather[0].id);
            $('#my-weather-description').text(" "+ data.weather[0].description);
            $('#my-temp').text(tempC + " °" + scale);

            $('#my-button').on("click", function () {
                // The algorithm to convert from Celsius to Fahrenheit is the temperature in Celsius times 1.8, plus 32.
                if (scale == "C") {
                    scale = "F";
                    $("#my-toggle").removeClass('fa-toggle-on');
                    $("#my-toggle").addClass('fa-toggle-off');
                    return $('#my-temp').text(tempF + " °" + scale);
                } else {
                    scale = "C";
                    $("#my-toggle").removeClass('fa-toggle-off');
                    $("#my-toggle").addClass('fa-toggle-on');
                    return $('#my-temp').text(tempC + " °" + scale);
                }
            });
            console.log(data.wind.deg);
            $("#my-wind-icon").addClass("from-"+ data.wind.deg +"-deg");
            $("#my-wind-description").text("wind " + data.wind.speed + " m/s");
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

