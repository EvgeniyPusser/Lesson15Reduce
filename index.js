// Description: Implement the `myReduce` function which works like the native `Array.prototype.reduce` method.
// The `myReduce` function will reduce an array into a single value, from left to right, using a callback function.

const minMaxReducer = (acc, val) => [
  val < acc[0] ? val : acc[0], // Update min
  val > acc[1] ? val : acc[1], // Update max
];

const minMax = (arr) =>
  !Array.isArray(arr) || arr.length === 0
    ? [undefined, undefined]
    : myReduce(arr, minMaxReducer, [arr[0], arr[0]]);

function myReduce(array, callback, initialValue) {
  let accumulator = initialValue;
  for (let i = 0; i < array.length; i++) {
    accumulator = callback(accumulator, array[i], i, array);
  }
  return accumulator;
}

// ✅ Test Cases
console.log(myReduce([3, 1, 7, 5, 9, 2], minMaxReducer, [Infinity, -Infinity])); // [1, 9]
console.log(
  myReduce([-10, -5, 0, 20, 100], minMaxReducer, [Infinity, -Infinity])
); // [-10, 100]
console.log(myReduce([5], minMaxReducer, [Infinity, -Infinity])); // [5, 5]
console.log(myReduce([], minMaxReducer, [Infinity, -Infinity])); // [Infinity, -Infinity] (or change to [undefined, undefined])

console.log(myReduce([3, 1, 7, 5, 9, 2], minMaxReducer, [3, 3])); // [1, 9]
console.log(myReduce([-10, -5, 0, 20, 100], minMaxReducer, [-10, -10])); // [-10, 100]
let numbers = [1, 2, 3, 4, 5];
let strings = ["uiui", "Jio", "000", "Triangle", "MORNING", ""];
console.log(myReduce(numbers, (acc, val) => acc + val, 0)); // Output: sum of numbers
console.log(myReduce(strings, (acc, val) => acc + val, "")); // Output: sum of strings

console.log(minMax(numbers)); // Output: [-90, 2300]

console.log(minMax(strings)); // Output: ["", "uiui"]

console.log(myReduce([1, 2, 3, 4, 5], (acc, val) => acc + val, 0)); // Output: 15 (sum of all elements)

console.log(minMax([3, 1, 7, 5, 9, 2])); // Output: [1, 9]

console.log(
  `Original Array: ${[-90, 0, 89.89, 2300]} gives min and max as ${minMax([
    -90, 0, 89.89, 2300,
  ])} minMax[0]===-90 minMax[1]===2300}`
);
console.log(
  `Original Array: ${strings} gives min and max as ${minMax(
    strings
  )} minMax[0]==="" minMax[1]==="uiui"`
);

console.log(myReduce(numbers, (acc, val) => acc + val, 0));
// Output: 27 (sum of all elements)

console.log(minMax(numbers));
// Output: [1, 9] (min and max values)

console.log(minMax(strings));

// Case 1: No initial value (uses first element)
console.log(myReduce([5, 10, 15], (acc, val) => acc + val));
// Output: 30 (5 + 10 + 15)

// Case 2: Initial value provided
console.log(myReduce([5, 10, 15], (acc, val) => acc + val, 100));
// Output: 130 (100 + 5 + 10 + 15)

// Case 3: Initial value is `undefined`
console.log(myReduce([5, 10, 15], (acc, val) => acc + val, undefined));
// Output: 30 (acts as if initial value wasn't given)

// Case 4: Empty array without initial value
// This would normally throw an error in native `reduce`
try {
  console.log(myReduce([], (acc, val) => acc + val));
} catch (e) {
  console.log("Error: Cannot reduce an empty array without an initial value.");
}

// Case 5: Empty array with `undefined` as the initial value
console.log(myReduce([], (acc, val) => acc + val, undefined));
// Output: undefined (since array is empty, accumulator stays undefined)

console.log(minMax([3, 1, 7, 5, 9, 2])); // ✅ Output: [1, 9]
console.log(minMax([])); // ✅ Output: [undefined, undefined]
console.log(minMax(undefined)); // ✅ Output: [undefined, undefined]
console.log(minMax(null)); // ✅ Output: [undefined, undefined]
console.log(minMax("string")); // ✅ Output: [undefined, undefined]

console.log(myReduce([1, 2, 3, 4, 5], (acc, val) => acc + val, 0)); // ✅ 15
console.log(myReduce([], (acc, val) => acc + val, 0)); // ✅ 0
console.log(myReduce([], (acc, val) => acc + val)); // ❌ Error: Cannot reduce an empty array without an initial value.
