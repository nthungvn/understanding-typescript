abstract class Department {
  // name: string;
  static fiscalYear = 2020;

  protected readonly employees: string[] = [];

  constructor(protected readonly id: string, private name: string) {
    // this.name = name;
    Department.fiscalYear = 2028;
  }

  static createEmployee(name: string) {
    this.fiscalYear = 2024;
    return { name };
  }

  abstract describe(this: Department): void;

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

  describe() {
    console.log('ITDepartment - ID: ' + this.id);
  }
}

class AccountingDepartment extends Department {
  private lastReport: string;
  private static instance: AccountingDepartment;

  private constructor(id: string, private reports: string[]) {
    super(id, 'Accounting');
    this.lastReport = reports[0];
  }

  static getInstance() {
    if (!this.instance) {
      this.instance = new AccountingDepartment('d3', []);
    }
    return this.instance;
  }

  describe() {
    console.log('AccountingDepartment - ID: ' + this.id);
  }

  addEmployee(name: string) {
    if (name === 'Hung') {
      return;
    }
    this.employees.push(name);
  }

  addReport(report: string) {
    this.reports.push(report);
    this.lastReport = report;
  }

  printReports() {
    console.log(this.reports);
  }

  get mostRecentReport() {
    if (!this.lastReport) {
      throw new Error('There is no report!');
    }
    return this.lastReport;
  }

  set mostRecentReport(report: string) {
    if (!report) {
      throw new Error('Please enter a valid report!');
    }
    this.addReport(report);
  }
}

const employee1 = Department.createEmployee('Max');
console.log(employee1);
console.log(Department.fiscalYear);

const it = new ITDepartment('d1', ['Hung', 'Nguyen']);
console.log(it);
it.describe();
it.addEmployee('Hung');
it.addEmployee('Fuok');
// accounting.employees[2] = 'Tran';
// accounting.name = 'New name';
it.printEmployeeInformation();

const accounting = AccountingDepartment.getInstance();
accounting.mostRecentReport = 'Year end report';
console.log(accounting.mostRecentReport);
accounting.addEmployee('Hung');
accounting.addEmployee('Fuok');
accounting.addReport('Something went wrong...');
accounting.printReports();
accounting.describe();
console.log(accounting);

// const accountingCopied = {
//   name: 'Dummy',
//   describe: accounting.describe,
// }

// accountingCopied.describe();
