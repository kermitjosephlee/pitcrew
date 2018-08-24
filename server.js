const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const PORT = 8080;
const cookieSession = require("cookie-session");

//****************************************

app.use(bodyParser.urlencoded({ extended: true }));

app.use(
  cookieSession({
    name: "session",
    keys: ["key1", "key2"],
    maxAge: 60 * 60 * 60 * 1000 // <= 60 hours in milliseconds
  })
);

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

// -1. DISPATCH Page
app.get("/dispatch", (req, res) => {
  res.render("/dispatch");
});

// 0. Welcome page render
app.get("/", (req, res) => {
  res.render("/login");
});

// 1. RIDER calls for help
// will need logic to evaulate riderObj to see if we get all the info we need to create a ticket
app.post("/:rider/", (req, res) => {
  let riderObj = req.body.riderObj;
  let tempTicket = ticketParser(riderObj);
  let ticketId = res.redirect("/:rider/HelpHasBeenCalled");
});

// 2. DISPATCH receives call for help and send a pending call render to rider
app.get("/:rider/HelpHasBeenCalled", (req, res) => {
  res.render("/:rider/HelpHasBeenCalled");
});

// 3. DISPATCH assigns ticket to potential TECHS
// 4. TECHS receive pending ticket requests
app.get("/newTickets/:tech", (req, res) => {
  res.render("/newTickets");
});

// 5. One TECH confirms ticket - changing pending ticket status to ACTIVE - sends POST to DISPATCH
app.post("/newTickets/:tech", (req, res) => {
  let ticketStatus = req.body.acceptOrDecline;
  if (ticketStatus) {
    res.redirect("/riderLocation");
  } else {
    res.redirect("/index");
  }
});

// 6. DISPATCH receives confirm from TECH - updates ticket status
app.get("/");

// 7. DISPATCH sends update to RIDER
// 8. TECH arrives at RIDER - sends update to DISPATCH
// 9. TECH finishes ticket - sends update to DISPATCH
// 10. RIDER ticket update
// 11. DISPATCH changes status & archives ticket

//****************************************

app.listen(PORT, () => {
  console.log("PitCrew app listening on port ${PORT}!");
  console.log("ooo eee can do!");
});
