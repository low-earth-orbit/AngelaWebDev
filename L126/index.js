var loveScore = Math.random()*101;
loveScore = Math.floor(loveScore); // loveScore's range is [0 - 100]
if (loveScore === 100){ // 3 equal signs checks for data type
  console.log("OMG, your love score is " + loveScore);
} else {
  console.log("Your love score is " + loveScore);
}
