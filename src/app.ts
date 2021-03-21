function Logger(constructor: Function) {
  console.log('Logging...');
  console.log(constructor);
}

@Logger
class Person {
  name = 'Hung';

  constructor() {
    console.log('Creating a person...');
  }
}

// const person = new Person();
