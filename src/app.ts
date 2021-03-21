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

interface Lengthy {
  length: number;
}

function countAndDescribe<T extends Lengthy>(element: T): [T, string] {
  let descriptionText = 'Got no value.';
  if (element.length === 1) {
    descriptionText = 'Got one element.';
  } else if (element.length > 1) {
    descriptionText = 'Got ' + element.length + ' elements.';
  }
  return [element, descriptionText];
}

console.log(countAndDescribe(''));
console.log(countAndDescribe([]));
console.log(countAndDescribe('Hi there!'));
console.log(countAndDescribe(['Sports', 'Cooking']));

function extractAndConvert<T extends object, U extends keyof T>(
  obj: T,
  key: U
) {
  return obj[key];
}

console.log(extractAndConvert({ name: 'Hung' }, 'name'));

// console.log(extractAndConvert({  }, 'name')); // Error
