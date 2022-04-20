// javascript object
var bellBoy1 = {
  name: "Timmy",
  age: 19,
  hasWorkPermit: true,
  languages: ["French","English"],
  moveSuitcase: function () {
    alert("May I take your suitcase?");
    pickUpSuitCase();
    move();
  }
}

// constructor function
function BellBoy = (name, age, hasWorkPermit, languages) {
  this.name = name;
  this.age =age;
  this.hasWorkPermit = hasWorkPermit;
  this.languages=languages;
  this.moveSuitcase =function (){
    alert("May I take your suitcase?");
    pickUpSuitCase();
    move();
  }
}

// initialize object using constructor function
var bellBoy1 = new BellBoy("Timmy", 19, true, ["French","English"]);

// call the method associated with bellBoy1
bellBoy1.moveSuitcase();
