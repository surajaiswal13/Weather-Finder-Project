const express = require("express");
const bodyParser = require("body-parser");
// For External API'switch

const https = require("https");

const app = express();
app.use(bodyParser.urlencoded({extended: true}));

app.get("/", function(req, res) {
  res.sendFile(__dirname + "/index.html")
});

app.post("/", (req, res) => {
  console.log("Post Recieved");
  console.log(req.body.cityName);


  const query = req.body.cityName;
  const apiKey = "9e06423e1c5b431794bfaaa5668ad869";
  const units = "metric";

  // https:// needs to be on starting of url

  const url = "https://api.openweathermap.org/data/2.5/weather?q="+ query +"&appid="+ apiKey +"&units=" + units;

  https.get(url, function(response) {
    console.log(response.statusCode);

    // response.on("data", function(data) {
    response.on("data", (data) => {
      console.log(data);    // It prints hexadecimal version of data

      const weatherData = JSON.parse(data);
      // console.log(weatherData);
      const temp = weatherData.main.temp;
      // console.log(temp);
      const weatherDescription = weatherData.weather[0].description;
      // console.log(weatherDescription);
      const weatherIcon = weatherData.weather[0].icon;

      const imageUrl = "http://openweathermap.org/img/wn/"+ weatherIcon +"@2x.png"

      res.write("<h1>The temperature in London is " + temp + " degree  Celcius.</h1>");
      res.write("<p>The weather is currently " + weatherDescription + "</p>");
      res.write("<img src=" + imageUrl + ">")
      res.send();

    })
  })

  // res.send("Server is up and running");

});


app.listen(3000, function() {
  console.log("Server is running on port 3000 !")
});
