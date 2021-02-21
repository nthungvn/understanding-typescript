function add(num1: number, num2: number, showResult: boolean, phrase: string) {
  // if (typeof num1 !== 'number' || typeof num2 !== 'number') {
  //   throw new Error('Invalid input');
  // }
  if (showResult) {
    console.log(phrase + (num1 + num2));
  } else {
    return num1 + num2;
  }
}
const num1 = 5;
const num2 = 3.3;
const printResult = true;
const resultPhrase = 'The result is ';

add(num1, num2, printResult, resultPhrase);
