/** @format */

const mongoose = require("mongoose");
require("dotenv").config();
mongoose.connect(process.env.MONGODB_URI, (err) => {
  if (!err) {
    console.log("MongoDB connection succeeded.");
  } else {
    console.log(
      "Error in MongoDB connection : " + JSON.stringify(err, undefined, 2)
    );
  }
});

require("../Models/employee");
