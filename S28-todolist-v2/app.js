const express = require("express");
const bodyParser = require("body-parser");
const date = require(__dirname + "/date.js");
const mongoose = require("mongoose");
const _ = require("lodash");

// const https = require("https");
// const request = require("request");

const app = express();
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

mongoose.connect("mongodb://localhost:27017/todolistDB");
const itemSchema = {
    name: String    
};
const Item = mongoose.model("Item", itemSchema); // this will create a collection

const listSchema = {
    name: String,
    items: [itemSchema] // array of items
}
const List = mongoose.model("List", listSchema);

const item1 = new Item({
    name: "Welcome to your to do list."
});
const item2 = new Item({
    name: "Hit the + button to add a new item."
});
const item3 = new Item({
    name: "<-- Hit this to delete an item."
});

const defaultItems = [item1, item2, item3];

/* 
    default list "Today": items saved to "items" collection
*/
app.get("/", function(req, res){
    Item.find({}, function(err, foundItems){
        if (foundItems.length === 0){
            Item.insertMany([item1, item2, item3], function (err){
                if (err){
                    console.log(err);
                } else {
                    console.log("Successfully saved default items!")
                }
            });
            res.redirect("/");
        } else {
            // res.render("list", {listTitle: date.getDate(), listItems: items});
            res.render("list", {listTitle: "Today", listItems: foundItems});
        }
    });
});

app.post("/", function(req, res){
    console.log(req.body); // print user input item name
    const itemName = req.body.newItem;
    const listName = req.body.list;

    const item = new Item({
        name: itemName
    });
    
    if (listName === "Today"){ 
        item.save();
        res.redirect("/");       
    } else {
        List.findOne({name: listName}, function(err, foundList){
            if (!err) {
                foundList.items.push(item);
                foundList.save();
                res.redirect("/" + listName);                
            }
        });
    }
});

app.post("/delete",function(req, res){
    const checkedItemId = req.body.checkbox;
    const listName = req.body.listName;

    if (listName === "Today") {
        Item.findByIdAndRemove(checkedItemId, function(err){
            if (err) {
                console.log(err);
            } else {
                console.log("Successfully removed an item.");
                res.redirect("/");
            }
        });
    }
    else {
        List.findOneAndUpdate({name: listName}, {$pull: {items: {_id: checkedItemId}}}, function(err, foundList){
            if (!err) {
                res.redirect("/" + listName);
            }
        });
    }
});

// app.get("/about", function(req, res){
//     res.render("about");
// });

/*
    Custom list
*/
app.get("/:customListName", function(req, res){
    customListName = _.capitalize(req.params.customListName);

    List.findOne({name: customListName}, function(err, foundList){
        if (!err) {
            if (!foundList){
                // create a new list
                const list = new List({
                    name: customListName,
                    items: defaultItems
                });
                list.save();
                res.redirect("/" + customListName);
            } else {
                // show an existing list 
                res.render("list", {listTitle: foundList.name, listItems: foundList.items});
            }
        }
        else {
            console.log(err);
        }
    });
    
});

app.listen(process.env.PORT || 3000, function() {// process.env.PORT is Heroku app port
    console.log("Server is running on port 3000.");
});
