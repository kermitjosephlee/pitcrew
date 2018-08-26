const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const PORT = 8080;
const cookieSession = require("cookie-session");

//****************************************

app.use(bodyParser.urlencoded({ extended: true }));

app.use(
  cookieSession({
    name: "session",
    keys: ["key1", "key2"],
    maxAge: 60 * 60 * 60 * 1000 // <= 60 hours in milliseconds
  })
);

//****************************************

const dispatchUsers = {};

const techUsers = {};

let activeRiders = {};

//****************************************

const ticketParser = riderObj => {
  const tempObj = JSON.parse(riderObj);
  return tempObj;
};

//****************************************

// 1. Generic USER gets login page
app.get("/", (req, res) => {
  res.render("main");
});

// 2. RIDER posts login information
app.post("/login", (req, res) => {
  const userName = req.body.userName;
  const password = req.body.password;
  res.redirect("/:rider");
});

//****************************************

app.listen(PORT, () => {
  console.log("PitCrew app listening on port ${PORT}!");
  console.log("ooo eee can do!");
});
