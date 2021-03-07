// const person: { name: string; age: number } = {
// const person: {
//   name: string,
//   age: number,
//   hobbies: string[],
//   role: [number, string],
// } = {
//   name: 'Hung',
//   age: 28,
//   hobbies: ['Sports', 'Cooking', 'Hiking'],
//   role: [1, 'admin'],
// };

// console.log(person.name);

// person.role.push('employee');
// // person.role[0] = 'employee'; error
// person.role[0] = 2;
// person.role[1] = 'employee';

enum Role {
  ADMIN = 32,
  READ_ONLY = 323,
  EMPLOYEE = 323,
}

const person = {
  name: 'Hung',
  age: 28,
  hobbies: ['Sports', 'Cooking', 'Hiking'],
  role: Role.ADMIN,
};

if (person.role === Role.ADMIN) {
  console.log('is admin');
}

let favoriteActivities: string[];
favoriteActivities = ['Sport'];

for (let hobby of person.hobbies) {
  console.log(hobby.toUpperCase());
}

console.dir(person);
