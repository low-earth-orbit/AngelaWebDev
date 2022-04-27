require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require("mongoose");
// const encrypt = require("mongoose-encryption"); // mongoose-encryption: secret-key encryption
// const md5 = require("md5"); // md5: hashing
const bcrypt = require('bcrypt'); // bcrypt: hashing + salting
const saltRounds = 10;

const app = express();
app.use(express.static("public"));
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: true}));

mongoose.connect("mongodb://localhost:27017/userDB");
const userSchema = new mongoose.Schema({
    username: String,
    password: String    
});

// userSchema.plugin(encrypt, { secret: process.env.ENCRYPTION_SECRET_KEY, encryptedFields: ['password'] }); // mongoose-encryption: secret-key encryption

const User = mongoose.model("User", userSchema);

//////////////////////////////////////////

app.get("/", function(req, res){
    res.render("home");
});

app.get("/login", function(req, res){
    res.render("login");
});

app.get("/register", function(req, res){
    res.render("register");
});

app.post("/register", function(req, res){
    const username = req.body.username;
    const password = req.body.password;

    User.findOne({username: username}, function(err, foundUser){
        if (err) {
            // DB query err
            console.log(err);
        } else {
            if (foundUser) {
                // User already exists
                console.log("Cannot register with this username or password.");
            } else {
                // User does not exist
                bcrypt.hash(password, saltRounds, function(err, hash) {
                    // Store hash in your password DB.
                    const newUser = new User({
                        username: username,
                        password: hash // hashing applied
                    });
                    newUser.save(function(err){
                        if (err) {
                            console.log(err);
                        } else {
                            res.render("secrets");
                        }
                    });
                });

            }
        }
    });
});

app.post("/login", function(req, res){
    const username = req.body.username;
    const password = req.body.password; // hashing
    User.findOne({username: username}, function(err, foundUser){
        if (err) {
            // DB query err
            console.log(err);
        } else {
            if (foundUser) {
                // If user exists
                bcrypt.compare(password, foundUser.password, function(err, result) {
                    if (result == true) {
                        // If user exists and password is correct
                        res.render("secrets");
                    } else {
                        // User exists but password is not correct
                        console.log("Invalid username or password.");
                    }
                });
            } else {
                // User does not exist
                console.log("Invalid username or password.");
            }
        }
    });
});

///////////////////////////
app.listen(process.env.PORT || 3000, function() {// rocess.env.PORT is Heroku app port
    console.log("Server is running.");
});