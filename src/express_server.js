const express = require("express");
const app = express();
<<<<<<< HEAD
var bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
=======
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
>>>>>>> feature/react-express-communicate

// An api endpoint that returns a short list of items
app.get("/api/hello", (req, res) => {
  res.send({ express: "Hello From Express BITCHES!!" });
});

<<<<<<< HEAD
app.post("/post_test", (req, res) => {
  console.log("node js ok");
  var getId = req.body.id; // here, i don't get the id value
  console.log("id Node js : " + getId);
});

const port = process.env.PORT || 5000;
=======
app.get("/api/users", (req, res) => {
  res.send({ activeUsers });
});

// app.post("/register", (req, res) => {
//   if (username && password) {
//     const encryptedPassword = bcrypt.hashSync(password, saltRounds);
//   }
// });

const port = process.env.PORT || 8080;
>>>>>>> feature/react-express-communicate
app.listen(port);

console.log("App is listening on port " + port);
// const aliceCryptPassword = bcrypt.hashSync(activeUsers[0].password, saltRounds);
console.log(activeUsers[0].encryptedPassword);
