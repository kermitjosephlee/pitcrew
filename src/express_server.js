const express = require("express");
const app = express();
var bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// An api endpoint that returns a short list of items
app.get("/api/hello", (req, res) => {
  res.send({ express: "Hello From Express" });
});

app.post("/post_test", (req, res) => {
  console.log("node js ok");
  var getId = req.body.id; // here, i don't get the id value
  console.log("id Node js : " + getId);
});

const port = process.env.PORT || 5000;
app.listen(port);

console.log("App is listening on port " + port);
