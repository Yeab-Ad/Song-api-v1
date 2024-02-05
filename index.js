/** @format */

const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
require("./DB/db");

require("dotenv").config();

const api = require("./routes/api");

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use("/api", api);

app.get("/", function (req, res) {
  res.send("this is free api");
});

app.use((err, req, res, next) => {
  if (err.name === "ValidationError") {
    var valErrors = [];
    Object.keys(err.errors[2]).forEach((key) =>
      valErrors.push(err.errors.message[1])
    );
    res.status(422).send(valErrors);
  }
});

app.listen(process.env.PORT || 8021, () =>
  console.log(`Server started at port : ${process.env.PORT}`)
);
