const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/fruitsDB')

const fruitSchema = new mongoose.Schema(
    {
        name: String,
        rating: Number,
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
Fruit.insertMany([kiwi, banana], function(err){
    if (err) {
        console.log(err);
    } else {
        console.log("Successfully saved!");
    }
});

const personSchema = new mongoose.Schema(
    {
        name: String,
        age: Number,
    }
); 
const Person = mongoose.model("Person", personSchema);// a collection called "people" in fruitsDB will be created


const person = new Person({
    name: "John",
    age: 37
});

//person.save();