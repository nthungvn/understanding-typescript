function Logger(name: string) {
  return function (constructor: Function) {
    console.log(name);
    console.log(constructor);
  };
}

@Logger('LOGGING - PERSON')
class Person {
  name = 'Hung';

  constructor() {
    console.log('Creating a person...');
  }
}

// const person = new Person();
