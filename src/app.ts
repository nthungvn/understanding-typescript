function combine(
  input1: number | string,
  input2: number | string,
  resultConversion: 'as-number' | 'as-string'
) {
  let result;
  if (
    (typeof input1 === 'number' && typeof input2 === 'number') ||
    resultConversion === 'as-number'
  ) {
    result = +input1 + +input2;
  } else {
    result = input1.toString() + input2.toString();
  }
  return result;
}

const combineAges = combine(28, 28, 'as-number');
console.log(combineAges);

const combineStringAges = combine('28', '28', 'as-number');
console.log(combineStringAges);

const combineNames = combine('Hung', 'Nguyen', 'as-string');
console.log(combineNames);
