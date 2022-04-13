var name = prompt("What is your name?");
var firstChar = name.slice(0,1);
firstChar = firstChar.toUpperCase();
var restChar = name.slice(1,name.length).toLowerCase();
var nameCaptalized = firstChar + restChar;
alert("Hello, " + nameCaptalized);
