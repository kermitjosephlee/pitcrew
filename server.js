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

const user = [];

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

let tickets = [
  // {
  //   id: 1,
  //   rider: "Bob",
  //   lat: 43.639701,
  //   lng: -79.459055,
  //   type: "mechanic",
  //   startTime: "2018-08-30T16:10:28.638Z",
  //   description: "A",
  //   status: "pending"
  // },
  // {
  //   id: 2,
  //   rider: "Sally",
  //   lat: 43.6476611,
  //   lng: -79.459055,
  //   type: "mechanic",
  //   startTime: "2018-08-30T16:10:28.638Z",
  //   description: "B",
  //   status: "pending"
  // },
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

app.get("/dashboard", (req, res) => {
  res.render({
    activeUsers
  });
});

app.post("/login", (req, res) => {
  const data = req.body;
  db.checkUser(data)
    .then(() => {
      console.log(`USER EXISTS`);
      res.send(data);
    })
    .catch(error => {
      console.log(`ERROR ${error}`);
    });
});

// app.post("/register/rider", (req, res) => {
//   let data = req.body;
//   activeUsers.push({
//     username: data.username,
//     contact: data.contact,
//   });
//   console.log(activeUsers);
// });

app.post("/register", (req, res) => {
  const data = req.body;
  db.checkRegister(data)
    .then(() => {
      if (data.type === "Dispatch") db.registerDispatch(data);
      else if (data.type === "Technician") db.registerTechnician(data);
      else if (data.type === "Rider")
        activeUsers.push({
          username: data.username,
          contact: data.contact
        });
      console.log(activeUsers);
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
  console.log(
    data.rider + " is assigned to tech with id: " + data.assigned_tech_id
  );
});

//****************************************

app.listen(PORT, () => {
  console.log(`PitCrew app listening on port ${PORT}!`);
  console.log("ooo eee can do!");
});
