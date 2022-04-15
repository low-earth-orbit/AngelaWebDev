var buttonColours = ["red", "blue", "green", "yellow"];

var gamePattern = [];
var userClickedPattern = [];

var level = 0;
if (level === 0) {
  $(document).keypress(function (){
    $("h1").text("Level 0");
    nextSequence();
  });
}

$(".btn").click(function (){ // jQuery handlers are anonymous functions
  var userChosenColour = $(this).attr('id'); // I used this.attr('id') ->WRONG
  userClickedPattern.push(userChosenColour);
  checkAnswer(userClickedPattern.length - 1);
  playSound(userChosenColour);
  animatePress(userChosenColour);
});

/*
  check userClickedPattern element against gamePattern
*/
function checkAnswer(index) {
  if (userClickedPattern[index] === gamePattern[index]) {
    console.log ("success");
    // if it's the last element, call nextSequence() to move up the level
    if (userClickedPattern.length === gamePattern.length){
      setTimeout(function() {
        nextSequence();
      }, 1000);
    }
  }
  else {
    playSound("wrong");
    console.log("failed");
    startOver();
  }
}

function nextSequence() {
  userClickedPattern = []; // set userClickedPattern to empty
  var randomNumber = Math.floor(Math.random()*4);
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);
  $("#" + randomChosenColour).fadeOut().fadeIn();
  playSound(randomChosenColour);
  level ++;
  $("h1").text("Level " + level);

}

function playSound(name){
  var sound = new Audio("sounds/"+ name +".mp3");
  sound.play();
}

function animatePress(currentColour){
  $("#" + currentColour).addClass("pressed");
  setTimeout(function() {
    $("#" + currentColour).removeClass("pressed");
  }, 100);
}

function startOver (){
  level = 0;
  gamePattern = [];
  userClickedPattern = []; // duplicated in nextSequence(); be here for safe
  $("body").addClass("game-over");
  $("h1").text("Game Over, Press Any Key to Restart");
  setTimeout(function() {
    $("body").removeClass("game-over");
  }, 200);
}