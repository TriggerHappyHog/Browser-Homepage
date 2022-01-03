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