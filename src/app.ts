// const person: { name: string; age: number } = {
const person: {
  name: string,
  age: number,
  hobbies: string[],
  role: [number, string],
} = {
  name: 'Hung',
  age: 28,
  hobbies: ['Sports', 'Cooking', 'Hiking'],
  role: [1, 'admin'],
};

let favoriteActivities: string[];
favoriteActivities = ['Sport'];

for (let hobby of person.hobbies) {
  console.log(hobby.toUpperCase());
}

console.log(person.name);

person.role.push('employee');
// person.role[0] = 'employee'; error
person.role[0] = 2;
person.role[1] = 'employee';
console.dir(person);
