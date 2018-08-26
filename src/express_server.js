const express = require("express");
const app = express();

// An api endpoint that returns a short list of items
app.get("/api/hello", (req, res) => {
  res.send({ express: "Hello From Express" });
});

const port = process.env.PORT || 5000;
app.listen(port);

console.log("App is listening on port " + port);
