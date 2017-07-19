var key = "&appid=2f174dce58ac71c3a07312be6f6a114c";
var baseurl = "http://api.openweathermap.org/data/2.5/weather?q="
var kelvinfactor = 273.15;

function input() {
  var usercity = prompt("Please enter your name", "Your city");
  datarequest(usercity);
}

function datarequest(city) {
  var url = baseurl+city+key;
  $.ajax({
    url: url,
    success: function(data) {
      console.log(data);
      print(data)
    }
  });
}

function print(data) {
    $("#cityarea").text(data.name + ", " + data.sys.country);
    $("#temperaturarea").text(Math.floor(data.main.temp-kelvinfactor));
    var weather = weatherf(data);
    var icon = iconf(data);
    $("#weatherarea").text(weather);
    $("#imagecode").text(icon);
}

function weatherf(data) {
  var weatherloop = "";
  for (var i = 0 ; i<2 ; i++) {
    if (data.weather[i] != undefined) {
      weatherloop += data.weather[i].main + ", ";
    }
  }
  weatherloop = weatherloop.slice(0,-2)
  return weatherloop;
}

function iconf(data) {
  var iconloop = "";
  for (var i = 0 ; i<2 ; i++) {
    if (data.weather[i] != undefined) {
      iconloop += data.weather[i].icon + ", ";
    }
  }
  iconloop = iconloop.slice(0,-2);
  return iconloop;
}
