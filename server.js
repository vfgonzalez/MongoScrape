var express = require("express")
var bodyParser = require("body-parser")
var mongoose = require("mongoose")
var cheerio = require("cheerio")
var request = require("request")

var MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/mongoscraperdb";


var PORT = 3000 || process.env.PORT

mongoose.Promise = Promise;
mongoose.connect(MONGODB_URI);

var app = express()

app.use(bodyParser.urlencoded({ extended: true }));
// Use express.static to serve the public folder as a static directory
app.use(express.static("public"));

// Connect to the Mongo DB
// mongoose.connect("mongodb://localhost/mongoscraperdb");



require("./routes/api-routes.js")(app);

var db = require("./models");


app.listen(PORT, function(){
    console.log("App Listening on PORT "+ PORT +".");
    
})