const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require("mongoose");

const app = express();
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

mongoose.connect("mongodb://localhost:27017/wikiDB"); // connect to databse uri
const articleSchema = {
    title: String,
    content: String    
}; // schema
const Article = mongoose.model("Article", articleSchema); // this will create a collection: model name is article.

app.route("/articles")

.get(
    function(req, res){
        // Fetches all the articles 
        Article.find({}, function(err, foundArticles){
            if (!err){
                res.send(foundArticles);
            } else {
                res.send(err);
            }
        });
    }
)

.post(function(req, res){
    // Creates one new article
    const postTitle = req.body.title;
    const postContent = req.body.content;
    const newArticle = new Article({
        title: postTitle,
        content: postContent
    });
    newArticle.save(function(err){
        if (!err){
            res.send("Successfully created a new article.");
        } else {
            res.send(err);
        }
    });
})

.delete(function(req, res){
    // Deletes all articles 
    Article.deleteMany(function(err){
        if (!err) {
            res.send("Successfully deleted all articles.");
        } else {
            res.send(err);
        }
    });
});

/*
    For a specific article 
*/
app.route("/articles/:title")

.get(function(req,res){
    // Returns the article matching the requested title 
    const requestedTitle = req.params.title;
    Article.findOne({title: requestedTitle}, function(err, article){
        if (!err) {
            res.send(article);
        } else {
            res.send(err);
        }
    });
})

// .put and .patch in this app.js are similar.
// The difference is that in this .put, the parameters for $set were provided while in .patch, a js object, req.body, is passed in.
// The update() DB function in Angela's video is deprecated.
.put(function(req,res){
    // Updates the article
    Article.updateOne({title: req.params.title}, {$set: { title: req.body.title, content: req.body.content}}, {overwrite: true }, function(err, article){
        if (!err) {
            res.send("Successfully updated the article.");
        } else {
            res.send(err);
        }
    });

})

.patch(function(req,res){
    // Updates the article 
    Article.updateOne({title: req.params.title}, {$set: req.body}, function(err, article){
        if (!err) {
            res.send("Successfully updated the article.");
        } else {
            res.send(err);
        }
    });
})

.delete(function(req,res){
    // Delete the article 
    Article.deleteOne({title: req.params.title}, function(err){
        if (!err) {
            res.send("Successfully deleted the article.");
        } else {
            res.send(err);
        }
    });
});

app.listen(process.env.PORT || 3000, function() {// rocess.env.PORT is Heroku app port
    console.log("Server is running.");
});