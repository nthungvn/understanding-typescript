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

function PropertyLog(target: any, propertyName: string | Symbol) {
  console.log('// START: Property decorator');
  console.log(target);
  console.log(propertyName);
  console.log('// END');
}

function AccessorLog(target: any, propertyName: string | Symbol, descriptor: PropertyDescriptor) {
  console.log('// START: Accessor decorator');
  console.log(target);
  console.log(propertyName);
  console.log(descriptor);
  console.log('// END');
}

function MethodLog(target: any, propertyName: string | Symbol, descriptor: PropertyDescriptor) {
  console.log('// START: Method decorator');
  console.log(target);
  console.log(propertyName);
  console.log(descriptor);
  console.log('// END');
}

function ParameterLog(target: any, propertyName: string | Symbol, position: number) {
  console.log('// START: Parameter decorator');
  console.log(target);
  console.log(propertyName);
  console.log(position);
  console.log('// END');
}

class Product {
  @PropertyLog
  title: string;
  private _price: number;

  @AccessorLog
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

  @MethodLog
  getPriceWithTax(@ParameterLog tax: number) {
    return this._price * (1 + tax);
  }
}
