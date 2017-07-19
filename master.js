var key = "&appid=2f174dce58ac71c3a07312be6f6a114c";
var baseurl = "http://api.openweathermap.org/data/2.5/weather?";
var kelvinfactor = 273.15;
var fUsed = false;
var celsiusCache = 0;
var cors_api_url = 'https://cors-anywhere.herokuapp.com/';
var cssDeployed = false;

getLocation();

function getLocation() {
  if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(usePosition);
  } else {
      $("#cityarea").text("Geolocation is not supported by this browser. You can still use the manuell search.");
  }
}

function usePosition(position) {
  if (cssDeployed = "false") {
    $("#tempbutton").append("<button type=\"button\" name=\"button\" onclick=\"fahrenheit()\">Show Fahrenheit</button>");
    $("#inputbutton").append("<button type=\"button\" name=\"button\" onclick=\"input()\">Other City</button>");
    cssDeployed = true;
  }
  var userPosition = "lat=" + position.coords.latitude + "&lon=" + position.coords.longitude;
  datarequest(userPosition)
}

function input() {
  var usercity = "q=" + prompt("Please enter your name", "Your city");
  datarequest(usercity);
}

function datarequest(parameter) {
  var url = cors_api_url+baseurl+parameter+key;
  $.ajax({
    url: url,
    success: function(data) {
      print(data)
    }
  });
}

function print(data) {
    cityf(data)
    weatherTextf(data);
    $("#temperaturarea").text(Math.floor(data.main.temp-kelvinfactor)+"°C");
    celsiusCache = Math.floor(data.main.temp-kelvinfactor);
    iconf(data);
}

function cityf(data) {
  var formattedCity = "<h2>"+data.name + ", " + data.sys.country+"</h2>";
  $("#cityarea").html(formattedCity);
}

function weatherTextf(data) {
  var weather = weatherf(data);
  var formattedWeather = "<h3>The weather is: "+weather+".</h3>";
  $("#weatherarea").html(formattedWeather);
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
  var iconloop = [];
  for (var i = 0 ; i<2 ; i++) {
    if (data.weather[i] != undefined) {
      iconloop[i] += data.weather[i].icon;
    }
  }
  iconFormatterf(iconloop)
}

function iconFormatterf(iconloop) {
  var imageText = "";
  for (var i = 0; i < 2; i++) {
    if (iconloop[i] != undefined) {
      imageText += iconloop[i].toString();
    }
  }
  imageText = imageText.replace(/\D/g,'');
  imageGenf(imageText);
}

function imageGenf(imageText) {
  $("#imagecode").text("");
  var formattedIMG = "";
  var count = 0;
  var numb = "";
  while (imageText != "") {
    if (numb == imageText.slice(0,2)) {
      break;
    }
    numb = imageText.slice(0,2);
    formattedIMG = "<img src=\"img/"+numb+".svg\" class=\"weather-icon\"/>"
    imageText = imageText.slice(2);
    $("#imagecode").append(formattedIMG);
  }
}

function fahrenheit() {
  if (fUsed) {
    $("#temperaturarea").text(celsiusCache + "°C");
    fUsed = false;
  } else {
    $("#temperaturarea").text(celsiusCache*9/5+32 + "°F");
    fUsed = true;
  }
}
