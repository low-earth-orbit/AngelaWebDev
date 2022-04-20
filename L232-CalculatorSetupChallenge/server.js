// require expreee
const express = require('express');
const app = express();

// require body-parser
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({extended: true}));

// check if server is running
app.listen(3000, function(){
  console.log("Server is running on port 3000.");
});

// root route get method
app.get('/', function (req, res) {
  res.sendFile(__dirname + "/index.html");
});

app.post('/', function (req, res) {
  var num1 = Number(req.body.num1);
  var num2 = Number(req.body.num2);
  var result = num1 + num2;
  res.send("The result is " + result);
});

// root route get method
app.get('/bmicalculator', function (req, res) {
  res.sendFile(__dirname + "/bmiCalculator.html");
});

app.post('/bmicalculator', function (req, res) {
  var weight = Number(req.body.weight);
  var height = Number(req.body.height);
  var bmi = weight / (height * height );
  var bmiString = bmi.toFixed(2);
  res.send("Your BMI is " + bmiString +".");
});

