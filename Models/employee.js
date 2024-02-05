const mongoose = require("mongoose");

const employeeSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  number: { type: String, required: true },
  password: { type: String, required: true },
  address: { type: String, required: true },
  country: { type: String, required: true },
  city: { type: String, required: true },
  state: { type: String, required: true },
  delete_at: { type: Date, default: null },
  update_at: { type: Date, default: null },
  created_at: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Employee", employeeSchema);
