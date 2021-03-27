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

interface ValidationConfig {
  [propertyName: string]: {
    [validationProperty: string]: string[]
  }
}

const globalValidationConfig: ValidationConfig = {};

function Required(target: any, propertyName: string) {
  globalValidationConfig[target.constructor.name] = {
    ...globalValidationConfig[target.constructor.name],
    [propertyName]: ['required']
  }
}

function PositiveNumber(target: any, propertyName: string) {
  globalValidationConfig[target.constructor.name] = {
    ...globalValidationConfig[target.constructor.name],
    [propertyName]: ['positive']
  }
}

function validate(obj: any) {
  const objValidationConfig = globalValidationConfig[obj.constructor.name];
  if (!objValidationConfig) {
    return true;
  }

  let isValid = true;
  for (let propertyName in objValidationConfig) {
    for (let validator of objValidationConfig[propertyName]) {
      switch (validator) {
        case 'required':
          isValid = isValid && !!obj[propertyName];
          break;
        case 'positive':
          isValid = isValid && obj[propertyName] > 0;
          break;
      }
    }
  }
  return isValid;
}

class Course {
  @Required
  title: string;

  @PositiveNumber
  price: number;

  constructor(title: string, price: number) {
    this.title = title;
    this.price = price;
  }
}

const formCourse = document.querySelector('form');
formCourse?.addEventListener('submit', (event) => {
  event.preventDefault();
  const titleEl = formCourse.querySelector('#title') as HTMLInputElement;
  const priceEl = formCourse.querySelector('#price') as HTMLInputElement;
  const title = titleEl.value;
  const price = +priceEl.value;

  const course = new Course(title, price);
  if (!validate(course)) {
    console.log('Invalid input, please enter again');
    return;
  }

  console.log(course);
})
