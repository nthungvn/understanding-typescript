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

function add(n1: Combinable, n2: Combinable) {
  if (typeof n1 === 'string' || typeof n2 === 'string') {
    return +n1 + +n2;
  }
  return n1 + n2;
}

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
