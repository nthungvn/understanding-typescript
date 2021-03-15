class Department {
  // name: string;
  private employees: string[] = [];

  constructor(private name: string) {
    // this.name = name;
  }

  describe(this: Department) {
    console.log('Department: ' + this.name);
  }

  addEmployee(employee: string) {
    this.employees.push(employee);
  }

  printEmployeeInformation() {
    console.log(this.employees.length);
    console.log(this.employees);
  }
}

const accounting = new Department('Accounting');
console.log(accounting);
accounting.describe();
accounting.addEmployee('Hung');
accounting.addEmployee('Fuok');
// accounting.employees[2] = 'Tran';
// accounting.name = 'New name';
accounting.printEmployeeInformation();


// const accountingCopied = {
//   name: 'Dummy',
//   describe: accounting.describe,
// }

// accountingCopied.describe();
