
// type AddFn = (a: number, b: number) => number;

interface AddFn {
  (a: number, b: number): number;
}

let add: AddFn;

add = (a: number, b: number) => {
  return a + b;
}

console.log(add(3, 2));

interface Named {
  readonly name?: string;
  outputName?: string;
}

interface Greetable extends Named {
  greet(phrase: string): void;
}

class Person implements Greetable {
  name?: string;
  age = 30;

  constructor(name?: string) {
    if (name) {
      this.name = name;
    }
  }

  greet(phrase: string): void {
    if (this.name) {
      console.log(phrase + ' ' + this.name);
    } else {
      console.log('Hi!');
    }
  }

}

let user1: Greetable;

// user1 = new Person('Hung');
user1 = new Person();
// user1.name = 'Fuok';
user1.greet('Hi there, I am ');
console.log(user1);
