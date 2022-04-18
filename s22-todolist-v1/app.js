const express = require("express");
const bodyParser = require("body-parser");
const date = require(__dirname + "/date.js");
// const https = require("https");
// const request = require("request");
// console.log(date);
// console.log(date());

const app = express();
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

app.get("/", function(req, res){
    res.render("list", {listTitle: date.getDate(), listItems: items});
});

const items = []; // items is initiated outside so it is accessible by app.get()
const workItems = [];
app.post("/", function(req, res){
    console.log(req.body);
    const item = req.body.newItem;
    if (req.body.list === "Work List") {
        workItems.push(item);
        res.redirect("/work");
    } else {
        items.push(item);
        res.redirect("/");
    }
});

app.get("/work", function(req, res){
    res.render("list", {listTitle: "Work List", listItems: workItems});  
});

app.get("/about", function(req, res){
    res.render("about");
});

app.listen(process.env.PORT || 3000, function() {// rocess.env.PORT is Heroku app port
    console.log("Server is running on port 3000.");
});
