const names: Array<string> = ['Hung'];
names[0].split(' ');

const promise: Promise<number> = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve(100);
  }, 2000);
});

promise.then((data) => {
  console.log(typeof data);
});

function merge<T extends object, U extends object>(objA: T, objB: U) {
  return Object.assign(objA, objB);
}

const mergeObj = merge({ name: 'Hung', hobbies: ['Sports'] }, { age: 28 });
// Equivalent to
// const mergeObj = merge<{ name: string; hobbies: string[] }, { age: number }>(
//   { name: 'Hung', hobbies: ['Sports'] },
//   { age: 28 }
// );
console.log(mergeObj);
console.log(mergeObj.name);
