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

type Combinable = string | boolean;
type Numeric = number | boolean;

type Universal = Numeric & Combinable;

let value: Universal;
value = false;
