const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.urlencoded({extended:true}));

// check if server is running
app.listen(3000, function() {
  console.log("Server is running on port 3000.");
});

// send home page upon GET request
app.get("/", function(req, res){
  res.sendFile(__dirname + "/index.html");
});

// send weather data upon POST
app.post('/', function (req, res) {

  // STEP 1: use geocoding api to retrieve latitude longitude
  const query = req.body.cityName;
  const apiKey = "ed95ddb451bad7a5825d7fc028237fe8";
  geocodingURL = "https://api.openweathermap.org/geo/1.0/direct?q=" + query + "&limit=1&appid=" + apiKey;
  https.get(geocodingURL, function(geoResponse){
    console.log("Geocoding API response: " + geoResponse.statusCode);
    geoResponse.on("data", function(dataG){
      const geoData = JSON.parse(dataG);
      console.log(geoData);
      const city = geoData[0].name;
      const latitude = geoData[0].lat;
      const longitude = geoData[0].lon;
      const state = geoData[0].state;
      const country = geoData[0].country;
      console.log("query lat, lon: " + latitude + ", " + longitude);

      // STEP2: use open Weather API to retrieve weather data
      const units = "metric";
      const url = "https://api.openweathermap.org/data/2.5/weather?lat=" + latitude +"&lon=" + longitude + "&units=" + units + "&appid=" + apiKey;
      https.get(url, function(response){
        console.log(response.statusCode);
        response.on("data", function(dataW){
          const weatherData = JSON.parse(dataW);
          console.log(weatherData);
          const temperature = weatherData.main.temp;
          const weatherDescription = weatherData.weather[0].description;
          const iconName = weatherData.weather[0].icon;
          const imageURL = "http://openweathermap.org/img/wn/" + iconName + "@2x.png";

          res.write("<h1>The temperature in " + city + ", " + state + ", " + country + " is " + temperature + " degrees Celcius.</h1>");
          res.write("<p>The weather is currently " + weatherDescription +  " </p>");
          res.write("<img alt= '" + weatherDescription +  " icon' src = " + imageURL +">");
          res.send();
        })
      });
    })
  });

});

