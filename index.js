function minMax(arr) {
  return myReduce(
    arr,
    (acc, val) => {
      return [val < acc[0] ? val : acc[0], val > acc[1] ? val : acc[1]];
    },
    [arr[0], arr[0]]
  );
}

function myReduce(array, callback, initialValue) {
  let accumulator = initialValue !== undefined ? initialValue : array[0];
  let startIndex = initialValue !== undefined ? 0 : 1;

  for (let i = startIndex; i < array.length; i++) {
    accumulator = callback(accumulator, array[i]);
  }

  return accumulator;
}

const strings = ["uiui", "Jio", "000", "Triangle", "MORNING", ""];
const numbers = [-90, 0, 89.89, 2300];
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
