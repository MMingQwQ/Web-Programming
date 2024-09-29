const express = require("express");
const app = express();
const PORT = 5055;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/e_1.html");
});

app.post("/findSummation", (req, res) => {
  const number = parseInt(req.body.number, 10);
  let result = findSummation(number);
  res.send(`The result is: ${result}`);
});

app.post("/uppercaseFirstandLast", (req, res) => {
  const string = req.body.string;
  const result = uppercaseFirstandLast(string);
  res.send(`The result is: ${result}`);
});

app.post("/findAverageAndMedian", (req, res) => {
  // Assuming the numbers are sent as a comma-separated string:
  const numbersString = req.body.numbers;
  // Split the string by commas and convert each part to a Number
  const numbersArray = numbersString.split(",").map(Number);

  // Now check if the conversion to numbers was successful
  if (numbersArray.some(isNaN)) {
    // If any part of the array is NaN, send an error response
    res.status(400).send("Input must be an array of numbers");
    return;
  }

  const result = findAverageAndMedian(numbersArray);
  const output = `The average is ${result.avg} and the median is ${result.med}.`;
  res.send(output);
});

app.post("/find4Digits", (req, res) => {
  const stringOfNumbers = req.body.stringOfNumbers;

  if (typeof stringOfNumbers === "string") {
    let result = find4Digits(stringOfNumbers);
    res.send(`The result is: ${result}`);
  } else {
    res.status(400).send("Invalid input");
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port:${PORT}`);
});

//----------Function Part-------------------//

// Function A: findSummation
// Parameter(s): A positive integer number (default value is =1)
function findSummation(n = 1) {
  if (typeof n !== "number" || n <= 0 || !Number.isInteger(n)) {
    return false;
  }

  let summation = 0;
  for (let i = 1; i <= n; i++) {
    summation += i;
  }

  return summation;
}

// Function B: uppercaseFirstandLast
// Parameter(s): String
function uppercaseFirstandLast(str) {
  let words = str.split(" ");

  let modifiedWords = words.map((word) => {
    if (word.length === 1) {
      // If the word has only one character, just convert it to uppercase.
      return word.toUpperCase();
    } else {
      let first = word.charAt(0).toUpperCase();
      let last = word.charAt(word.length - 1).toUpperCase();
      return first + word.slice(1, -1) + last;
    }
  });

  return modifiedWords.join(" ");
}

// Function C: findAverageAndMedian
// Parameter: An array of numbers.
function findAverageAndMedian(numbers) {
  let avg = numbers.reduce((sum, cur) => sum + cur, 0) / numbers.length;

  let sorted = numbers.sort((a, b) => a - b);
  let mid = Math.floor(sorted.length / 2);
  let med =
    sorted.length % 2 === 0 ? (sorted[mid - 1] + sorted[mid]) / 2 : sorted[mid];

  return { avg, med };
}

// Function D: find4Digits
// Parameter: A string of numbers separated by spaces.
function find4Digits(str) {
  const numbers = str.split(" ");
  const fourDigitNumber = numbers.find(
    (number) => number.length === 4 && !isNaN(number)
  );
  return fourDigitNumber || false;
}
