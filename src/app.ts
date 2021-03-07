function add1(num1: number, num2: number) {
  return num1 + num2;
}

function printResult2(num: number): void {
  console.log('Result is ' + num);
}

function printResult3(num: number): undefined {
  console.log('Result is ' + num);
  return;
}

type FunctionAdd = (a: number, b: number) => number;

// let combineValues: Function;
let combineValues: FunctionAdd;

combineValues = add1;
// combineValues = printResult2
// combineValues = 5;


printResult2(add1(3, 5));
console.log(combineValues(2, 3));
