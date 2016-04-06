//============================================== ver. 1.0  =========================================
var apiKey = "3aa29487f83e54bcc224d7ad20d3fc8e";

function getWeather() {
    var output = document.getElementById("out");

    if (!navigator.geolocation) {
        output.innerHTML = "<p>Geolocation is not supported by your browser</p>";
        return;
    }

    function success(position) {
        var lat = position.coords.latitude;
        var lon = position.coords.longitude;

        output.innerHTML = '<p>Have a Nice Day :)</p>';

        $.getJSON("http://api.openweathermap.org/data/2.5/weather?lat=" + lat + "&lon=" + lon + "&units=metric&APPID=" + apiKey, function (data) {
            // console.log(data);
            // var temp = data.main.temp;
            var scale = "C";

            $('#my-temp').text(data.main.temp + " °" + scale);

            $('#my-button').on("click", function(){
                    // The algorithm to convert from Celsius to Fahrenheit is the temperature in Celsius times 9/5, plus 32.
                if (scale == "C") {
                    var temp = (data.main.temp * 1.8) + 32;
                    scale = "F";
                    return $('#my-temp').text(temp + " °" + scale);
                } else {
                    // temp = (temp - 32) / 1.8;
                    scale = "C";
                    return $('#my-temp').text(data.main.temp + " °" + scale);
                }
            });

            $('#my-icon').attr('src', "http://openweathermap.org/img/w/" + data.weather[0].icon + ".png");
            $('#city').text(data.name);

            // onclick przelicz temp na inne stopnie
        });


        // var img = new Image();
        // img.src = "https://maps.googleapis.com/maps/api/staticmap?center=" + lat + "," + lon + "&zoom=8&size=200x100&sensor=false";
        // output.appendChild(img);
    };

    function error() {
        output.innerHTML = "Unable to retrieve your location";
    };

    output.innerHTML = "<p>Locating…</p>";

    navigator.geolocation.getCurrentPosition(success, error);
}


$(document).ready(function () {
    getWeather();
});



