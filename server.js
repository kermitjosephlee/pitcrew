const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const path = require("path");
const PORT = process.env.PORT || 8080;

//****************************************
//
app.use(bodyParser.urlencoded({ extended: true }));

// app.use(express.static(path.join(__dirname, "build")));

//****************************************

const dispatchUsers = {};

const techUsers = {};

let activeUsers = [
  {
    username: "alice",
    password: "qwe",
    encryptedPassword: "",
    type: "rider"
  },
  {
    username: "bob",
    password: "qwe",
    type: "tech"
  }
];

//****************************************

app.get("/api/hello", (req, res) => {
  res.send({ express: "Hello From Express - PitCrew" });
});

app.get("/api/users", (req, res) => {
  res.send({ activeUsers });
});

app.post("/post_test", (req, res) => {
  let getId = req.body.id;
  console.log("getId:", getId);
});
//****************************************

app.listen(PORT, () => {
  console.log(`PitCrew app listening on port ${PORT}!`);
  console.log("ooo eee can do!");
});
