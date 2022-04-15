// javascript object
var bellBoy1 = {
  name: "Timmy",
  age: 19,
  hasWorkPermit: true,
  languages: ["French","English"]
}

var houseKeeper1 = {
  yearsOfExperience: 12,
  name: "Jane",
  cleaningRepertoire: ["bathroom", "lobby", "bedroom"]
}

// initialize object using constructor function
var bellBoy1 = new BellBoy("Timmy", 19, true, ["French","English"]);

// constructor function
function BellBoy = (name, age, hasWorkPermit, languages) {
  this.name = name;
  this.age =age;
  this.hasWorkPermit = hasWorkPermit;
  this.languages=languages;
}
