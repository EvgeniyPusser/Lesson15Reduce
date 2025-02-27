function myReduce(array, callback, initialValue) {
  let acc = initialValue === undefined ? array[0] : initialValue;
  const index = initialValue === undefined ? 1 : 0;
  for (let i = index; i < array.length; i++) {
    acc = callback(acc, array[i], i, array);
  }
  return acc;
}

function minMax(arr) {
  if (!Array.isArray(arr) || arr.length === 0) return [undefined, undefined];
  return myReduce(
    arr,
    (acc, curr) => [Math.min(acc[0], curr), Math.max(acc[1], curr)],
    [arr[0], arr[0]]
  );
}

function createTestResult(script, expectedJSON, actualJSON, result) {
  return { script, expectedJSON, actualJSON, result };
}

function test(testObj) {
  const expectedJSON = JSON.stringify(testObj.expected);
  let evalRes;
  try {
    evalRes = eval(testObj.script);
  } catch (error) {
    evalRes = error.toString();
  }
  const actualJSON = JSON.stringify(evalRes);
  const result = expectedJSON === actualJSON ? "passed" : "failed";

  return createTestResult(testObj.script, expectedJSON, actualJSON, result);
}

//

function testframework(scripts, expectedResults) {
  const bodyElem = document.querySelector("body");

  // Create a container for the results
  const resultsContainer = document.createElement("div");

  // Add H1 heading
  resultsContainer.innerHTML = `<h1>TEST RESULTS</h1>`;

  const results = scripts.map((script, index) =>
    test({ script, expected: expectedResults[index] })
  );

  const passedCount = results.filter(
    (result) => result.result === "passed"
  ).length;
  const failedCount = results.filter(
    (result) => result.result === "failed"
  ).length;

  resultsContainer.innerHTML += `
    <ol>
      ${results
        .map(
          (result) => `
        <li class="${
          result.result === "passed" ? "item_passed" : "item_failed"
        }">
          ${result.script}: ${result.result}
        </li>
      `
        )
        .join("")}
    </ol>
    <p>
      <span class="item_passed">${passedCount} passed</span>, 
      <span class="item_failed">${failedCount} failed</span>
    </p>
  `;

  // Append instead of replacing body content
  bodyElem.appendChild(resultsContainer);
}


// Example Test Cases
const scripts = [
  `myReduce([3, 1, 7, 5, 9, 2], (acc, val) => [Math.min(acc[0], val), Math.max(acc[1], val)], [Infinity, -Infinity])`,
  `myReduce([5], (acc, val) => [Math.min(acc[0], val), Math.max(acc[1], val)], [Infinity, -Infinity])`,
  `myReduce([], (acc, val) => [Math.min(acc[0], val), Math.max(acc[1], val)], [Infinity, -Infinity])`,
  `minMax([3, 1, 7, 5, 9, 2])`,
];

const expectedResults = [
  [1, 9],
  [5, 5],
  [Infinity, -Infinity],
  [1, 1],
];

// Running the test framework
testframework(scripts, expectedResults);

// <ol>
