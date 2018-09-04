const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const path = require("path");
const PORT = process.env.PORT || 8080;
const db = require("./db");

//****************************************

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

//****************************************

let techs = [
  // {
  //   id: 1,
  //   RideId: 1,
  //   username: "Bob",
  //   name: "Mr. MeeFix",
  //   password: "123456",
  //   specialty: "mechanic",
  //   lat: 43.6876611,
  //   lng: -79.579055,
  //   availability: true
  // },
  // {
  //   id: 2,
  //   RideId: 1,
  //   username: "Chris",
  //   name: "Evans",
  //   password: "123456",
  //   specialty: "medical",
  //   lat: 43.6976611,
  //   lng: -79.479055,
  //   availability: true
  // },
  // {
  //   id: 3,
  //   RideId: 1,
  //   username: "Johnny",
  //   name: "Depp",
  //   password: "123456",
  //   specialty: "sweep",
  //   lat: 43.6996611,
  //   lng: -79.549555,
  //   availability: true
  // }
];

let tickets = [];

let id = 8080;

//****************************************

// this.express_socket = new WebSocket("ws://localhost:3001");
//
// this.socket.onopen = event => {
//   console.log("Connected to server");
//   this.socket.send(JSON.stringify(id));
// };

//****************************************

app.get("/", (req, res) => {
  db.getTickets();
  res.send("frontpage");
});

app.get("/dashboard", (req, res) => {
  res.render({
    activeUsers
  });
});

app.post("/login", (req, res) => {
  const data = req.body;
  db.checkUser(data)
    .then(query => {
      console.log(`USER EXISTS`);
      data.availability = true;
      data.id = query.id;
      techs.push(data);
      console.log("tech list", techs);
      res.send(data);
    })
    .catch(error => {
      console.log(`ERROR ${error}`);
    });
});

app.get("/fetchAvailableTechs", (req, res) => {
  res.send({
    techs
  });
  console.log("---------------------------------");
  console.log("Techs available: ", techs);
  console.log("---------------------------------");
});

app.post("/register", (req, res) => {
  const data = req.body;
  db.checkRegister(data)
    .then(() => {
      if (data.type === "Dispatch") {
        db.registerDispatch(data);
        res.send(data);
      } else if (data.type === "Technician") {
        db.registerTechnician(data);
        res.send(data);
      }
    })
    .catch(error => {
      console.log(`ERROR ${error}`);
    });
});

app.post("/newTicket", (req, res) => {
  let data = req.body;
  console.log("NEW TICKET", data);
  db.openTicket(data);
  // tickets.push(data)
  // tickets.push({
  //   id: parseFloat(data.id),
  //   location: {
  //     lat: parseFloat(data.location.lat),
  //     lng: parseFloat(data.location.lng)
  //   }
  //   // type: "rider"
  // });
  // console.log("Tickets:", tickets);
});

app.get("/fetchTickets", (req, res) => {
  const data = req.body;
  db.getTickets(data).then(data => {
    tickets = data;
    for (var ticket in tickets) {
      tickets[ticket].lat = parseFloat(tickets[ticket].lat);
      tickets[ticket].lng = parseFloat(tickets[ticket].lng);
    }
    // console.log(`TICKET DATA IN SERVER`, tickets);
  });
  res.send({
    tickets
  });
});

app.post("/assignTech", (req, res) => {
  const data = req.body;
  console.log("id >>> ", data);
  var tech = techs.find(function(tech) {
    return tech.id == data.id;
  });
  data.id = parseFloat(data.id);
  tech.availability = false;
  db.assignTech(tech);
  console.log(data.rider + " is assigned to tech with id: " + data.id);
});

//****************************************

app.listen(PORT, () => {
  console.log(`PitCrew app listening on port ${PORT}!`);
  console.log("ooo eee can do!");
});

//****************************************

const WebSocket = require("ws");
// const express = require("express");
const SocketServer = require("ws").Server;

// Set the port to 3001
const _PORT = 3001;

// Create a new express server
const server = express()
  // Make the express server serve static assets (html, javascript, css) from the /public folder
  .use(express.static("public"))
  .listen(_PORT, "0.0.0.0", "localhost", () =>
    console.log(`Listening on ${_PORT}`)
  );

// Create the WebSockets server
const wss = new SocketServer({ server });

let clients = {};
let counter = 0;

// Broadcast to all.
wss.broadcast = function broadcast(data) {};

// Set up a callback that will run when a client connects to the server
// When a client connects they are assigned a socket, represented by
// the ws parameter in the callback.
wss.on("connection", ws => {
  console.log("Client with id...");
  // counter++;
  // webSockets[counter] = ws;

  ws.on("message", function incoming(data) {
    message = JSON.parse(data);
    // clients[1] = ws;
    console.log(message);
    if (message.type == "id") {
      console.log(`... id: ${message.id} is connected`);
      clients[message.id] = ws;
      clients[message.id].send(JSON.stringify("TECH IS CONNECTED..."));
    }
  });

  // Set up a callback for when a client closes the socket. This usually means they closed their browser.
  ws.on("close", () => {
    console.log("Client disconnected");
  });
});

//****************************************

// express_socket = new WebSocket("ws://localhost:3001");
//
// express_socket.onopen = event => {
//   console.log("Connected to server");
//
//   let express_message = {
//     content: "Tech assgined",
//     tech_id: 3,
//     type: "Ticket"
//   };
//
//   express_socket.send(JSON.stringify(express_message));
// };
