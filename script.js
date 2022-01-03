var today = new Date();
var hour = today.getHours();
var minute = today.getMinutes();

var cHour = document.getElementById("hourh2");
var cMinute = document.getElementById("minuteh2");
var cDate = document.getElementById("dateh2");

//Set time
cHour.innerHTML = hour;
cMinute.innerHTML = minute;

//Trim Day
var day = today.toString();
var dayLeng = 10;
var trimmedDay = day.substring(0, dayLeng);

cDate.innerHTML = trimmedDay;

var weatherKey = "24c0f9ca369c9bf518cb17089064cc19";
    $.ajax({
        url: "https://api.openweathermap.org/data/2.5/weather?q=Manchester&units=metric&appid=" + weatherKey,
        type: "GET",
        success: function (result){
            console.log(result);
            weatherResult(result);
        },
        error: function(error) {
            console.log(error);
        }
    })

    function weatherResult(data){
        try {
            $("#cTemp").html(Math.round(data.main.temp) + "°");
            $("#cCity").html(data.name + ", " + data.sys.country);
        } catch (error) {
            $("#weatherBox").html("Error Caught: " + error);
        }
    }
