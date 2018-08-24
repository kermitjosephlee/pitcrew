const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const PORT = 8080;

//****************************************

const ticketParser = riderObj => {
  const tempObj = JSON.parse(riderObj);
  return tempObj;
};

//****************************************

app.get("/"),
  (req, res) => {
    res.render("/");
  };

app.post("/help_request"), (req, res) => {};

//****************************************

app.listen(PORT, () => {
  console.log("PitCrew app listening on port ${PORT}!");
  console.log("ooo eee can do!");
});
