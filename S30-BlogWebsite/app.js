const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require("mongoose");

const homeStartingContent = "Welcome to my blog.";
const aboutContent = "My name is Leo Hong. I am working on becoming a software developer.";
const contactContent = "Please feel free to contact me at myemail @ address.com. You can also find me on LinkedIn, GitHub, and StackOverFlow.";

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

mongoose.connect("mongodb://localhost:27017/blogDB");
const postSchema = {
    title: String,
    content: String    
};
const Post = mongoose.model("Post", postSchema); // this will create a collection

app.get("/", function(req, res){
  Post.find({}, function(err, foundPosts){
    res.render("home", {startingContent: homeStartingContent, postArray: foundPosts});
  });
});

app.get("/about", function(req, res){
  res.render("about", {startingContent: aboutContent});
});

app.get("/contact", function(req, res){
  res.render("contact", {startingContent: contactContent});
});

app.get("/compose", function(req, res){
  res.render("compose", {});
});

app.post("/compose", function(req, res){
  const postTitle = req.body.postTitle;
  const postContent = req.body.postBody;

  const newPost = new Post({
    title: postTitle,
    content: postContent
  });
  
  newPost.save(function(err){
    if (!err){
      res.redirect("/");
    }
  });
});

app.get("/posts/:id", function(req,res){
  const requestedId = req.params.id;
  Post.findOne({_id: requestedId}, function(err, post){
    if (!err){
      res.render("post", {
        title: post.title,
        content: post.content
      });
    } else {
      res.redirect("/");
    }
  });
});

app.listen(process.env.PORT || 3000, function() {// rocess.env.PORT is Heroku app port
  console.log("Server is running on port 3000.");
});
