const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const path = require("path");
const PORT = process.env.PORT || 8080;
const db = require("./db");

//****************************************
//
app.use(
  bodyParser.urlencoded({
    extended: true
  })
);

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

let tickets = [
  {
    id: 1,
    rider: "Bob",
    lat: 43.639701,
    lng: -79.459055,
    type: "mechanic",
    startTime: "2018-08-30T16:10:28.638Z",
    description: "A",
    status: "pending"
  },
  {
    id: 2,
    rider: "Sally",
    lat: 43.6476611,
    lng: -79.459055,
    type: "mechanic",
    startTime: "2018-08-30T16:10:28.638Z",
    description: "B",
    status: "pending"
  },
  {
    id: 3,
    rider: "Edward",
    lat: 43.6447046,
    lng: -79.3906215,
    type: "mechanic",
    startTime: "2018-08-30T16:10:28.638Z",
    description: "C",
    status: "pending"
  }
  // {
  //   id: 4,
  //   location: {
  //     lat: 43.6402511,
  //     lng: -79.411626
  //   }
  // },
  // {
  //   id: 5,
  //   location: {
  //     lat: 43.6443754,
  //     lng: -79.3823521
  //   }
  // }
];

//****************************************

app.get("/", (req, res) => {
  db.getTickets();
  res.send("frontpage");
});

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
  console.log("Register Tech:", data);
  db.registerTech(data);
});

app.post("/newTicket", (req, res) => {
  let data = req.body;
  tickets.push({
    id: 1,
    rider: data.rider,
    lat: data,
    lng: -79.459055,
    type: "mechanic",
    startTime: "2018-08-30T16:10:28.638Z",
    description: "A",
    status: "pending"
  });
  tickets.push({
    id: parseFloat(data.id),
    location: {
      lat: parseFloat(data.location.lat),
      lng: parseFloat(data.location.lng)
    }
    // type: "rider"
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
