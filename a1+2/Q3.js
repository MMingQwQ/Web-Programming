//---------------Part A------------------//
function addNumbers(numbers) {
  let sum = 0;
  for (let i = 0; i < numbers.length; i++) {
    sum += numbers[i];
  }
  return sum;
}

//---------------Part B------------------//
function findMaxNumber() {
  let max = -Infinity;
  for (let i = 0; i < arguments.length; i++) {
    if (arguments[i] > max) {
      max = arguments[i];
    }
  }
  return max;
}

//---------------Part C------------------//
function addOnlyNumbers(mixedData) {
  let sum = 0;
  mixedData.forEach((item) => {
    const num = parseFloat(item);
    if (!isNaN(num)) {
      sum += num;
    }
  });
  return sum;
}

//---------------Part D------------------//
function getDigits(string) {
  return string.match(/\d/g).join("");
}

//---------------Part E------------------//
function reverseString(string) {
  return string.split("").reverse().join("");
}

//---------------Part F------------------//
function getCurrentDate() {
  const date = new Date();
  const options = {
    weekday: "long",
    month: "short",
    day: "numeric",
    year: "numeric",
  };
  return date.toLocaleDateString("en-US", options);
}
