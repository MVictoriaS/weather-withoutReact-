const express = require("express");
const https = require("http");
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.urlencoded({
    extended: true
}));
app.get("/", function (req, res) {
    res.sendFile(__dirname + "/index.html");
})

app.post("/", function (req, res) {
    const query = req.body.cityName;
    //const weatherId = "";
    const units = "metric";
    const url = "http://api.openweathermap.org/data/2.5/weather?q=" + query + "&appid=" + weatherId + "&units=" + units + " "
    https.get(url, function (response) {

        console.log(response.statusCode);
        response.on("data", function (data) {
            const weatherData = JSON.parse(data)
            const temp = weatherData.main.temp
            const feelsLike = weatherData.main.feels_like
            const description = weatherData.weather[0].description
            const icon = weatherData.weather[0].icon
            const imageURL = "http://openweathermap.org/img/wn/" + icon + "@2x.png"
            console.log(temp);
            console.log(feelsLike);
            console.log(description);
            res.write("<h1>The current weather is?</h1>");
            res.write("<h2>The temperature in " + query + " is " + temp + " degrees celsius</h2>");
            res.write("<p>Feels like " + feelsLike + " degrees celsius and " + description + ". </p>");
            res.write("<img src=" + imageURL + ">");
            res.send()
        })
    })

})















app.listen(3000, function () {

    console.log("server is running on port 3000")



});