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



function testframework(scripts, expectedResults) {
  // Initialize body element
  const bodyElem = document.querySelector("body");

  const results = scripts.map((script, index) =>
    test({ script, expected: expectedResults[index] })
  );

  const { passed, failed } = results.reduce(
    (acc, result) => ({
      passed: result.result === "passed" ? acc.passed + 1 : acc.passed,
      failed: result.result === "failed" ? acc.failed + 1 : acc.failed,
    }),
    { passed: 0, failed: 0 }
  );

  bodyElem.innerHTML = orderedList(results, passed, failed);
}

function orderedList(results, passed, failed) {
  return `
    <div class="test-container">
      <h1>Test Results</h1>
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
      <div class="summary">
        <p class="summary_text">
          <span class="item_passed">${passed} passed</span>, 
          <span class="item_failed">${failed} failed</span>
        </p>
      </div>
    </div>
  `;
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
