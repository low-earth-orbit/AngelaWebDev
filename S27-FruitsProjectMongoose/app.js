/*
    Connect 
*/
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/fruitsDB')

/*
    Create
*/
const fruitSchema = new mongoose.Schema(
    {   
        // validation
        name: {
            type: String,
            required: [true, "Name is required."]
        },
        rating: { 
            type: Number,
            min: 1,
            max: 10
        },
        review: String
    }
);
const Fruit = mongoose.model("Fruit", fruitSchema); // a collection called "fruits" in fruitsDB will be created

const fruit = new Fruit({
    name: "Apple",
    rating: 7,
    review: "Pretty solid as a fruit."
});

// save to collection
// fruit.save();

const kiwi = new Fruit({
    name: "Kiwi",
    rating: 7,
    review: "Pretty solid as a fruit."
});

const banana = new Fruit({
    name: "Banana",
    rating: 7,
    review: "Pretty solid as a fruit."
});

// insert many
// Fruit.insertMany([kiwi, banana], function(err){
//     if (err) {
//         console.log(err);
//     } else {
//         console.log("Successfully saved!");
//     }
// });

const personSchema = new mongoose.Schema(
    {
        name: String,
        age: Number,
        favouriteFruit: fruitSchema // relationship
    }
);

const Person = mongoose.model("Person", personSchema);// a collection called "people" in fruitsDB will be created

const person = new Person({
    name: "John",
    age: 37,
    favouriteFruit: banana
});

// person.save();

/*
    Read
*/
Fruit.find(function(err, fruits){
    if (err){
        console.log(err);
    } else {
        console.log(fruits);
    }

});

Fruit.find(function(err, fruits){
    if (err){
        console.log(err);
    } else {
        fruits.forEach(function(fruit){
            console.log(fruit.name);
        });
    }

});

/*
    Update
*/
Fruit.updateOne({_id: "62620d260f9828e0726d8efb"}, {name: "Peach"}, function(err){
    if (err) {
        console.log(err);
    } else {
        // mongoose.connection.close(); // close the connection
        console.log("Successfully updated the document");
    }
});

/*
    Delete
*/
Fruit.deleteOne({name: "Peach"}, function(err){
    if (err) {
        console.log(err);
    } else {
        // mongoose.connection.close(); // close the connection
        console.log("Successfully deleted the document");
    }
});

Person.deleteMany({name: "John"}, function(err){
    if (err) {
        console.log(err);
    } else {
        mongoose.connection.close(); // close the connection
        console.log("Successfully deleted the document");
    }
});

