class Department {
  // name: string;
  private readonly employees: string[] = [];

  constructor(private readonly id: string, private name: string) {
    // this.name = name;
  }

  describe(this: Department) {
    // this.id = 'new';
    console.log(`Department (${this.id}): ${this.name}`);
  }

  addEmployee(employee: string) {
    // this.employees = ['Hung'];
    this.employees.push(employee);
  }

  printEmployeeInformation() {
    console.log(this.employees.length);
    console.log(this.employees);
  }
}

const accounting = new Department('d1', 'Accounting');
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
