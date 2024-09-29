const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const PORT = 5055;

app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/e_3.html");
});

app.post("/submit", (req, res) => {
  const { name, phone } = req.body;
  // Regular expression to validate phone number format
  const phoneRegex = /^\d{3}-\d{3}-\d{4}$/;

  // Check if phone number is in the correct format
  if (phoneRegex.test(phone)) {
    res.send(
      `Hello ${name}, your telephone number ${phone} is correctly formatted.`
    );
  } else {
    res.send(
      `Hello ${name}, the telephone number you entered ${phone} is not in the correct format. Please use the format ddd-ddd-dddd.`
    );
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port:${PORT}`);
});
