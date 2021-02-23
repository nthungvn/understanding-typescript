// const person: { name: string; age: number } = {
const person = {
  name: 'Hung',
  age: 28,
  hobbies: ['Sports', 'Cooking', 'Hiking'],
};

let favoriteActivities: string[];
favoriteActivities = ['Sport'];

for (let hobby of person.hobbies) {
  console.log(hobby.toUpperCase());
}

console.log(person.name);
