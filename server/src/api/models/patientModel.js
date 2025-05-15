const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const patientSchema = new Schema({
  first_name: { type: String },
  last_name: { type: String },
  phone_number: { type: String, unique: true },
  age: { type: Number },
  gender: { type: String, required: true, enum: ['male', 'female'] },
  address: { type: String },
  profile_img: { type: String },
  Doctor: [{ type: Schema.Types.ObjectId, required: false, ref: "Doctor" }],
  Appointment: [{ type: Schema.Types.ObjectId, required: false, ref: "Appointment" }]
});

module.exports = mongoose.model("Patient", patientSchema);
