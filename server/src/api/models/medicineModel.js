const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const medicineSchema = new Schema({
  name: { type: String, required: true, unique: true },
  description: { type: String, required: true },
});

module.exports = mongoose.model("Medicine", medicineSchema);
