const express = require("express");
const app = express();
const bcrypt = require("bcryptjs");
const saltRounds = 10;

const activeUsers = [
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

let tempEncryptedPassword = bcrypt.hashSync(
  activeUsers[0].password,
  saltRounds
);

activeUsers[0].encryptedPassword = tempEncryptedPassword;

//************************************************************

// An api endpoint that returns a short list of items
app.get("/api/hello", (req, res) => {
  res.send({ express: "Hello From Express BITCHES!!" });
});

app.get("/api/users", (req, res) => {
  res.send({ activeUsers });
});

// app.post("/register", (req, res) => {
//   if (username && password) {
//     const encryptedPassword = bcrypt.hashSync(password, saltRounds);
//   }
// });

const port = process.env.PORT || 5000;
app.listen(port);

console.log("App is listening on port " + port);
// const aliceCryptPassword = bcrypt.hashSync(activeUsers[0].password, saltRounds);
console.log(activeUsers[0].encryptedPassword);
