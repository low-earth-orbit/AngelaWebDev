// Generate dice #1 random number
var randomNumber1 = Math.floor(Math.random()*6 + 1);

// Change dice #1 image
document.querySelector(".img1").setAttribute("src","images/dice" + randomNumber1 + ".png");

// Do the same thing for dice #2
var randomNumber2 = Math.floor(Math.random()*6 + 1);
document.querySelector(".img2").setAttribute("src","images/dice" + randomNumber2 + ".png");

// Change text in h1 to indicate the winner
if (randomNumber1 > randomNumber2)
{
  document.querySelector("h1").textContent = "🚩 Player 1 Wins!";
}
else if (randomNumber1 < randomNumber2)
{
  document.querySelector("h1").textContent = "Player 2 Wins! 🚩";
}
else {
  document.querySelector("h1").textContent = "Draw!";
}
