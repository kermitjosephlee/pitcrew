const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const PORT = 8080;

app.use(bodyParser.urlencoded({ extended: true }));

//****************************************

const ticketParser = riderObj => {
  const tempObj = JSON.parse(riderObj);
  return tempObj;
};

//****************************************

// welcome page render
app.get("/", (req, res) => {
  res.render("/login");
});

// 1. RIDER calls for help
// will need logic to evaulate riderObj to see if we get all the info we need to create a ticket
app.post("/rider_help_request", (req, res) => {
  let riderObj = req.body.riderObj;
  let tempTicket = ticketParser(riderObj);
  res.redirect("/HelpHasBeenCalled");
});

// 2. DISPATCH receives call for help and send a pending call render to rider
app.get("/HelpHasBeenCalled", (req, res) => {
  res.render("/HelpHasBeenCalled");
});

// 3. DISPATCH assigns ticket to potential TECHS
// 4. TECHS receive pending ticket requests
// 5. One TECH confirms ticket - changing pending ticket status to ACTIVE - sends POST to DISPATCH
// 6. DISPATCH receives confirm from TECH - updates ticket status
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
