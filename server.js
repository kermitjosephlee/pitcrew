const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const path = require("path");
const PORT = process.env.PORT || 8080;

//****************************************
//
app.use(bodyParser.urlencoded({ extended: true }));

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

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

app.post("/login_user", (req, res) => {
  var exists = false;
  for (user in activeUsers) {
    if (activeUsers[user].username == req.body.username && exists == false) {
      console.log(req.body.username);
      console.log(activeUsers[user].username);
      exists = true;
    }
  }
  console.log(exists);
  res.send(exists);
});

app.post("/register", (req, res) => {
  let data = req.body;
  console.log("user registered:", data);
  activeUsers.push({
    username: req.body.username,
    password: req.body.password,
    type: "rider"
  });
  console.log(activeUsers);
});

//****************************************

app.listen(PORT, () => {
  console.log(`PitCrew app listening on port ${PORT}!`);
  console.log("ooo eee can do!");
});
