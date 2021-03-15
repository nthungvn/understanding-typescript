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

class ITDepartment extends Department {
  private admins: string[];
  constructor(id: string, admins: string[]) {
    super(id, 'IT');
    this.admins = admins;
  }
}

class AccountingDepartment extends Department {
  constructor(id: string, private reports: string[]) {
    super(id, 'Accounting');
  }

  addReport(report: string) {
    this.reports.push(report);
  }

  printReports() {
    console.log(this.reports);
  }
}

const it = new ITDepartment('d1', ['Hung', 'Nguyen']);
console.log(it);
it.describe();
it.addEmployee('Hung');
it.addEmployee('Fuok');
// accounting.employees[2] = 'Tran';
// accounting.name = 'New name';
it.printEmployeeInformation();

const accounting = new AccountingDepartment('d2', []);
accounting.addReport('Something went wrong...');
accounting.printReports();
console.log(accounting);

// const accountingCopied = {
//   name: 'Dummy',
//   describe: accounting.describe,
// }

// accountingCopied.describe();
