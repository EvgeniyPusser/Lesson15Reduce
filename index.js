const minMax = (arr) =>
  !Array.isArray(arr) || arr.length === 0
    ? [undefined, undefined]
    : myReduce(
        arr,
        (acc, val) => [
          val !== undefined && val < acc[0] ? val : acc[0],
          val !== undefined && val > acc[1] ? val : acc[1],
        ],
        [arr[0], arr[0]]
      );

function myReduce(array, callback, initialValue) {
  let accumulator = initialValue !== undefined ? initialValue : array[0];
  let startIndex = initialValue !== undefined ? 0 : 1;

  for (let i = startIndex; i < array.length; i++) {
    accumulator = callback(accumulator, array[i], i, array);
  }
  return accumulator;
}

// ✅ Corrected test cases
console.log(myReduce([1, 2, 3, 4, 5], (acc, val) => acc + val, 0)); // Output: 15 (sum of all elements)

console.log(minMax([3, 1, 7, 5, 9, 2])); // Output: [1, 9]

const strings = ["uiui", "Jio", "000", "Triangle", "MORNING", ""];
const numbers = [-90, 0, 89.89, 2300];

console.log(
  `Original Array: ${numbers} gives min and max as ${minMax(
    numbers
  )} minMax[0]===-90 minMax[1]===2300`
);
console.log(
  `Original Array: ${strings} gives min and max as ${minMax(
    strings
  )} minMax[0]==="" minMax[1]==="uiui"`
);

console.log(myReduce(numbers, (acc, val) => acc + val, 0)); // Output: sum of numbers

console.log(minMax(numbers)); // Output: [-90, 2300]

console.log(minMax(strings)); // Output: ["", "uiui"]

console.log(myReduce([1, 2, 3, 4, 5], (acc, val) => acc + val, 0)); // Output: 15 (sum of all elements)
//console.log(myReduce([-1, 2, -3, 4, 5], minMax(), 8)); // Output: 15 (sum of all elements)
// console.log(myReduce([-1, 2, -3, 4, 5], minMax(), 0));

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
