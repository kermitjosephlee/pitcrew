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

// const checkUser = async (data) => {
//   console.log('Verifying User')
//   try {
//     await db.checkUser(data)
//     console.log('CHEECK')
//     return true
//   } catch (err) {
//     console.log("ERROR2", err)
//     throw err
//   }
// }

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

app.get("/dashboard", (req, res) => {
  res.render({
    activeUsers
  });
});

app.post("/post_test", (req, res) => {
  let getId = req.body.id;

  console.log("getId:", getId);
});

app.post("/login", (req, res) => {
  const data = req.body;
  db.checkUser(data).then(() => {
    console.log(`USER EXISTS`)
    res.send(data)
  }).catch(error => {
    console.log(`ERROR ${error}`)
  })
});

app.post("/register/rider", (req, res) => {
  let data = req.body;
  activeUsers.push({
    username: data.username,
    password: data.password,
    type: "rider"
  });
  console.log(activeUsers);
});

app.post("/register", (req, res) => {
  const data = req.body;
  db.checkRegister(data).then(() => {
    if (data.type === 'Dispatch')
      db.registerDispatch(data)
    else
      db.registerTechnician(data)
  }).catch(error => {
    console.log(`ERROR ${error}`)
  })
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