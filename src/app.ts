interface Greetable {
  readonly name: string;

  greet(phrase: string): void;
}

class Person implements Greetable {
  name: string;
  age = 30;

  constructor(name: string) {
    this.name = name;
  }

  greet(phrase: string): void {
    console.log(phrase + ' ' + this.name);
  }

}

let user1: Greetable;

user1 = new Person('Hung');
// user1.name = 'Fuok';
user1.greet('Hi there, I am ');
console.log(user1);
