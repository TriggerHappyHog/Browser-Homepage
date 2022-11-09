var today;
var hour;
var minute;
var cHour = document.getElementById("hourh2");
var cMinute = document.getElementById("minuteh2");
var cDate = document.getElementById("dateh2");
var latCoord;
var longCoord;
var weatherKey = config.WEATHER_API_KEY;

function setClock(){
    setTimeout(function(){
        //Get Time
        today = new Date();
        hour = today.getHours();
        minute = today.getMinutes();
        //Set time
        cHour.innerHTML = hour;
        cMinute.innerHTML = minute;
        setClock()
    }, 1000);
}
setClock(); 
//Trim Day
today = new Date();
var day = today.toString();
var dayLeng = 10;
var trimmedDay = day.substring(0, dayLeng);

cDate.innerHTML = trimmedDay;

if ("geolocation" in navigator) {
    // check if geolocation is supported/enabled on current browser
    navigator.geolocation.getCurrentPosition(
     function success(position) {
       // for when getting location is a success
       console.log('latitude', position.coords.latitude, 
                   'longitude', position.coords.longitude);
        latCoord = position.coords.latitude;
        longCoord = position.coords.longitude;
        console.log(position);
        getWeather();
     },
    function error(error_message) {
      // for when getting location results in an error
      console.error('An error has occured while retrieving location', error_message)
    });
  } else {
    // geolocation is not supported
    // get your location some other way
    console.log('geolocation is not enabled on this browser')
  }

  function getWeather(){
    $.ajax({
        url: "https://api.openweathermap.org/data/2.5/weather?lat=" + latCoord + "&lon=" + longCoord + "&appid=" + weatherKey,
        type: "GET",
        success: function (result){
            console.log("Openweathermap: " + JSON. stringify(result));
            weatherResult(result);
        },
        error: function(error) {
            console.log(error);
        }
    })
  }
    function weatherResult(data){
        try {
            $("#cTemp").html(Math.round(data.main.temp) + "°");
            $("#cCity").html(data.name + ", " + data.sys.country);
            $("#weatherIcon").attr("src", "https://openweathermap.org/img/wn/" + data.weather[0].icon + ".png")
            $("#cLongLat").html(data.coord.lat + " " + data.coord.lon);
            $("#fl").html(data.main.feels_like);
            $("#temp").html(data.main.temp);
            $("#tmin").html(data.main.temp_min);
            $("#tmax").html(data.main.temp_max);
            $("#pressure").html(data.main.pressure);
            $("#humidity").html(data.main.humidity);
        } catch (error) {
            $("#weatherBox").html("Error Caught: " + error);
        }
    }

    onmousemove = function(e){$("#coord").html("X: " + e.clientX + " Y: " + e.clientY);
}