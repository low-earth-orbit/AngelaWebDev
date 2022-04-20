function subtract(num1, num2)
{
  return num1 - num2;
}

function add(num1, num2)
{
  return num1 + num2;
}

function calculate(num1, num2, operator)
{
  return operator(num1, num2);
}

console.log(calculate(2,1,add));
console.log(calculate(2,1,subtract));
