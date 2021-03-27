function Logger(name: string) {
  console.log('LOGGER FACTORY');
  return function (constructor: Function) {
    console.log(name);
    // console.log(constructor);
  };
}

function WithTemplate(template: string, hookId: string) {
  console.log('TEMPLATE FACTORY');
  return <T extends { new (...args: any[]): { name: string } }>(OriginalConstructor: T) => {
    return class extends OriginalConstructor {
      constructor(..._: any[]) {
        super();
        console.log('Template decorator');
        const hookEl = document.getElementById(hookId)!;
        hookEl.innerHTML = template;
        hookEl.innerHTML = `<h1>Hi, ${this.name}!</h1>`;
      }
    };
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

const person = new Person();

function PropertyLog(target: any, propertyName: string | Symbol) {
  console.log('// START: Property decorator');
  console.log(target);
  console.log(propertyName);
  console.log('// END');
}

function AccessorLog(
  target: any,
  propertyName: string | Symbol,
  descriptor: PropertyDescriptor
) {
  console.log('// START: Accessor decorator');
  console.log(target);
  console.log(propertyName);
  console.log(descriptor);
  console.log('// END');
}

function MethodLog(
  target: any,
  propertyName: string | Symbol,
  descriptor: PropertyDescriptor
) {
  console.log('// START: Method decorator');
  console.log(target);
  console.log(propertyName);
  console.log(descriptor);
  console.log('// END');
}

function ParameterLog(
  target: any,
  propertyName: string | Symbol,
  position: number
) {
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

function AutoBind(_: any, __: any, descriptor: PropertyDescriptor): PropertyDescriptor {
  const originalFunction = descriptor.value;
  return {
    configurable: true,
    enumerable: false,
    get: function () {
      const bindFn = originalFunction.bind(this);
      return bindFn;
    }
  }
}

class Printer {
  message = 'This worked!';

  @AutoBind
  showMessage() {
    console.log(this.message);
  }
}

const p = new Printer();

const button = document.querySelector('button');
button?.addEventListener('click', p.showMessage);
