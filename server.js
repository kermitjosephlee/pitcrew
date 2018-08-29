const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const path = require("path");
const PORT = process.env.PORT || 8080;
const db = require('./db')

//****************************************
//
app.use(bodyParser.urlencoded({
  extended: true
}));

app.use(function (req, res, next) {
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

const checkUser = async (data) => {
  console.log('Verifying User')
  try {
    const check = await db.checkUser(data)
    console.log('CHEECK', check)
  } catch (err) {
    console.log("ERROR", err)
  }
}

let activeUsers = [{
  username: "alice",
  password: "qwe",
  encryptedPassword: "",
  type: "rider"
}];

let tickets = [];

//****************************************

app.get("/api/hello", (req, res) => {
  res.send({
    express: "Hello From Express - PitCrew"
  });
});

app.get("/api/users", (req, res) => {
  res.send({
    activeUsers
  });
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

app.post("/register/rider", (req, res) => {
  let data = req.body;
  activeUsers.push({
    username: req.body.username,
    password: req.body.password,
    type: "rider"
  });
  console.log(activeUsers);
});

app.post("/register/dispatch", (req, res) => {
  let data = req.body;
  db.registerDispatch(data);
});

app.post("/register/tech", (req, res) => {
  let data = req.body;
  checkUser(data)
  // console.log("Register Tech:", data);
  // db.registerTech(data);
});

app.post("/newTicket", (req, res) => {
  let data = req.body;
  tickets.push({
    username: req.body.username,
    location: req.body.location,
    type: "rider"
  });
  console.log("Tickets:", tickets);
});

app.get("/fetchTickets", (req, res) => {
  res.send({
    tickets
  });
});

//****************************************

app.listen(PORT, () => {
  console.log(`PitCrew app listening on port ${PORT}!`);
  console.log("ooo eee can do!");
});