const express = require("express");
const app = express();
const morgan = require('morgan')
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

app.use(
  bodyParser.json()
)

app.use(morgan('dev'))
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});


//****************************************

const user = [];

const techs = [];

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
  let postName = req.method;
  let data = req.body;
  console.log("NEW TICKET", data);
  db.openTicket(data);
  tickets.push(data);
  tickets.push({
    id: parseFloat(data.id),
    location: {
      lat: parseFloat(data.lat),
      lng: parseFloat(data.lng)
    },
    type: "rider"
  });
  // console.log("Tickets:", tickets);
});

app.get("/fetchTickets", (req, res) => {
  const data = req.body;
  data.status = "pending";
  db.getTickets(data).then(data => {
    tickets = data;
    for (var ticket in tickets) {
      tickets[ticket].lat = parseFloat(tickets[ticket].lat);
      tickets[ticket].lng = parseFloat(tickets[ticket].lng);
    }
    console.log(`TICKET DATA IN SERVER`, tickets);
  });
  res.send({
    tickets
  });
});

app.post("/completeTicket", (req, res) => {
  const data = req.body;
  var ticket_to_be_completed = tickets.find(function(ticket) {
    return ticket.id == data.ticket_id;
  });
  ticket_to_be_completed.status = "completed";
  console.log("Completed ticket >>", ticket_to_be_completed);
  let tempData = {
    id: parseInt(data.ticket_id),
    status: "completed"
  };
  console.log(tempData);
  db.updateTicket(tempData);
});

// app.post("/assignTech", (req, res) => {
//   const data = req.body;
//   console.log("id >>> ", data);
//   var tech = techs.find(function(tech) {
//     return tech.id == data.id;
//   });
//   data.id = parseFloat(data.id);
//   tech.availability = false;
//   db.assignTech(tech);
//   console.log(data.rider + " is assigned to tech with id: " + data.id);
// });

//****************************************

app.listen(PORT, () => {
  console.log(`PitCrew app listening on port ${PORT}!`);
  console.log("ooo eee can do!");
});
