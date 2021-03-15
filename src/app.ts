class Department {
  name: string;

  constructor(name: string) {
    this.name = name;
  }

  describe(this: Department) {
    console.log('Department: ' + this.name);
  }
}

const accounting = new Department('Accounting');
console.log(accounting);
accounting.describe();

const accountingCopied = {
  name: 'Dummy',
  describe: accounting.describe,
}

accountingCopied.describe();
