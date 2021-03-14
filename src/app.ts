const userName = 'Hung';

let age = 28;

age = 29;

console.log(age);
console.log(userName);

// let result = 0;
// function add(num1: number, num2: number) {
//   result = num1 + num2;
//   return result;
// }

// add(3, 5);

// if (age === 29) {
//   let result = 1;
// }

// console.log(result);

const add = (num1: number, num2: number = 3) => {
  return num1 + num2;
}

const add1 = (num1: number = 3, num2: number) => num1 + num2;

console.log(add(1, 29));
console.log(add1(12, 29));

const printOutput: (a: string | number) => void = value => console.log(value);

printOutput('Hello world');

const button = document.querySelector('button');
if (button) {
  button.addEventListener('click', event => console.log(event));
}

printOutput(add(3));
// printOutput(add1(3)); Error
