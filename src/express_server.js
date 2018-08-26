const express = require("express");
const app = express();

const activeUsers = [
  {
    username: "alice",
    password: "qwe",
    type: "rider"
  },
  {
    username: "bob",
    password: "qwe",
    type: "rider"
  }
];

// An api endpoint that returns a short list of items
app.get("/api/hello", (req, res) => {
  res.send({ express: "Hello From Express BITCHES!!" });
});

app.get("/api/users", (req, res) => {
  res.send({ activeUsers });
});

const port = process.env.PORT || 5000;
app.listen(port);

console.log("App is listening on port " + port);
