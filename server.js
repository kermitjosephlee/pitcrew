const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const path = require("path");
const PORT = process.env.PORT || 8080;

//****************************************

app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, "build")));

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

app.get("*", (req, res) => {
  res.send({ express: "Hello from PitCrew" });
});

//****************************************

app.listen(PORT, () => {
  console.log(`PitCrew app listening on port ${PORT}!`);
  console.log("ooo eee can do!");
});
