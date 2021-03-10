let userInput: unknown;
let userName: string;

userInput = 34;
userInput = 'Hung';

if (typeof userInput === 'string') {
  userName = userInput;
  console.log(userName);
}

function generateError(message: string, code: number): never {
  throw {
    message: message,
    statusCode: code,
  }
  // return; // Compile error
}

const result = generateError('The error occurred', 500);
console.log(result);
