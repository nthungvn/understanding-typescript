function Logger(name: string) {
  console.log('LOGGER FACTORY');
  return function (constructor: Function) {
    console.log(name);
    // console.log(constructor);
  };
}

function WithTemplate(template: string, hookId: string) {
  console.log('TEMPLATE FACTORY');
  return (constructor: any) => {
    console.log('Template decorator');
    const person = new constructor();
    const hookEl = document.getElementById(hookId)!;
    hookEl.innerHTML = template;
    hookEl.innerHTML = `<h1>Hi, ${person.name}!</h1>`;
  };
}

@Logger('LOGGING - PERSON')
@WithTemplate('<h1>Hello, there</h1>', 'app')
class Person {
  name = 'Hung';

  constructor() {
    console.log('Creating a person...');
  }
}

// const person = new Person();

function Log(target: any, propertyName: string | Symbol) {
  console.log('Property decorator');
  console.log(target, propertyName);
}

class Product {
  @Log
  title: string;
  private _price: number;

  set price(value: number) {
    if (value > 0) {
      this._price = value;
    } else {
      throw Error('Invalid price - should be positive!');
    }
  }

  constructor(title: string, price: number) {
    this.title = title;
    this._price = price;
  }

  getPriceWithTax(tax: number) {
    return this._price * (1 + tax);
  }
}
