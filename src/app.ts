type Admin = {
  name: string;
  privileges: string[];
};

type Employee = {
  name: string;
  startDate: Date;
};

type ElevatedEmployee = Admin & Employee;

let e1: ElevatedEmployee;
e1 = {
  name: 'Hung',

  privileges: ['create-server'],
  startDate: new Date(),
};

type Combinable = string | number;
type Numeric = number | boolean;

type Universal = Numeric & Combinable;

let value: Universal;
value = 3;

function add(n1: number, n2: number): number;
function add(n1: string, n2: string): string;
function add(n1: string, n2: number): string;
function add(n1: number, n2: string): string;
function add(n1: Combinable, n2: Combinable) {
  if (typeof n1 === 'string' || typeof n2 === 'string') {
    return n1.toString() + ' ' + n2.toString();
  }
  return n1 + n2;
}

const r1 = add(3, 4);
const r2 = add('Hung', 4);
const r3 = add(3, 'Hung');
const r4 = add('Hung', 'Nguyen');

const fetchedUserData = {
  id: 'u1',
  name: 'Hung',
  job: {
    title: 'CEO',
    description: 'My company',
  }
};

console.log(fetchedUserData?.job?.title);

const userInput2 = '';
const storeData = userInput2 ?? 'Default';
console.log(storeData);

type UnknownEmployee = Employee | Admin;

function printEmployeeInformation(emp: UnknownEmployee) {
  console.log(`Name: ${emp.name}`);
  if ('privileges' in emp) {
    console.log(`Privileges: ${emp.privileges}`);
  }
  if ('startDate' in emp) {
    console.log(`startDate: ${emp.startDate}`);
  }
}

const e2 = {
  name: 'Phuoc',
  privileges: ['create-server'],
};

const e3 = {
  name: 'Tang',
  startDate: new Date(),
};

printEmployeeInformation(e1);
printEmployeeInformation(e2);
printEmployeeInformation(e3);

class Car {
  drive() {
    console.log('Driving a car...');
  }
}

class Truck {
  drive() {
    console.log('Driving a truck...');
  }

  loadCargo(amount: number) {
    console.log('Loading a cargo... ' + amount);
  }
}

type Vehicle = Car | Truck;

function useVehicle(vehicle: Vehicle) {
  vehicle.drive();
  if (vehicle instanceof Truck) {
    vehicle.loadCargo(3);
  }
  // if ('loadCargo' in vehicle) {
  //   vehicle.loadCargo(3);
  // }
}

useVehicle(new Car());
useVehicle(new Truck());

interface Bird {
  type: 'bird';
  flyingSpeed: number;
}

interface Horse {
  type: 'horse';
  runningSpeed: number;
}

type Animal = Bird | Horse;

function moveAnimal(animal: Animal) {
  let speed = 0;
  switch (animal.type) {
    case 'bird':
      speed = animal.flyingSpeed;
      break;
    case 'horse':
      speed = animal.runningSpeed;
    default:
      break;
  }
  console.log('Move at speed: ' + speed);
}

moveAnimal({
  type: 'bird',
  flyingSpeed: 30,
});

moveAnimal({
  type: 'horse',
  runningSpeed: 90,
});

// const userInput = document.getElementById('user-input') as HTMLInputElement;
const userInput = <HTMLInputElement> document.getElementById('user-input');
userInput.value = 'Hi there!';


interface ErrorContainer {
  // anotherKnownProp: string,
  [prop: string]: string;
}

const error: ErrorContainer = {
  email: 'Not a valid email',
  username: 'Must start with a capital letter',
}
