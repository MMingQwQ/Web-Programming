const express = require("express");
const cookieParser = require("cookie-parser");
const moment = require("moment-timezone");

const app = express();
app.use(cookieParser());

const PORT = 5055;

app.get("/", (req, res) => {
  if (req.cookies.numVisits) {
    // Increment the visit count
    let visits = parseInt(req.cookies.numVisits) + 1;

    // Retrieve the last visit time from cookie
    let lastVisit = req.cookies.lastVisit;

    // Update the cookies
    res.cookie("numVisits", visits.toString(), {
      maxAge: 900000,
      httpOnly: true,
    });
    const currentDate = new Date();
    const formattedDate = formatDate(currentDate);

    res.cookie("lastVisit", formattedDate, { maxAge: 900000, httpOnly: true });

    // Response for return visitors
    res.send(`Hello, this is the ${visits} time that you are visiting my webpage. <br>
                  Last time you visited my webpage on: ${lastVisit}`);
  } else {
    // First visit, set cookies
    const currentDate = new Date();
    const formattedDate = formatDate(currentDate);
    res.cookie("numVisits", "1", { maxAge: 900000, httpOnly: true });
    res.cookie("lastVisit", formattedDate, { maxAge: 900000, httpOnly: true });

    // Response for first-time visitors
    res.send("Welcome to my webpage! It is your first time that you are here.");
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port:${PORT}`);
});

function formatDate(date) {
  // Format the date as Eastern Time
  const tzDate = moment(date).tz("America/Montreal");
  return tzDate.format("ddd MMM DD HH:mm:ss z YYYY");
}
