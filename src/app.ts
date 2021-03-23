function Logger(name: string) {
  return function (constructor: Function) {
    console.log(name);
    console.log(constructor);
  };
}

function WithTemplate(template: string, hookId: string) {
  return (constructor: any) => {
    const person = new constructor();
    const hookEl = document.getElementById(hookId)!;
    hookEl.innerHTML = template;
    hookEl.innerHTML = `<h1>Hi, ${person.name}!</h1>`;
  };
}

// @Logger('LOGGING - PERSON')
@WithTemplate('<h1>Hello, there</h1>', 'app')
class Person {
  name = 'Hung';

  constructor() {
    console.log('Creating a person...');
  }
}

// const person = new Person();
