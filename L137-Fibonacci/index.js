function fibonacciGenerator (n) {
//Do NOT change any of the code above 👆

    //Write your code here:
    if (n === 0) {
      return output;
    }
    if (n === 1) {
      return [0];
    }
    if (n === 2) {
      return [0, 1];
    }
    var output = [0, 1];
    for (var i = 2; i < n; i++) {
        output.push(output[i-2]+output[i-1]);
    }
    return output;

    //Return an array of fibonacci numbers starting from 0.

//Do NOT change any of the code below 👇
}
