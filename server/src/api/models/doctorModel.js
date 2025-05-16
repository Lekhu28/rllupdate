const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const doctorSchema = new Schema({
  _id: { type: Schema.Types.ObjectId, ref: "User", required: true },
  speciality: { type: String, required: true },
  appointments: [
    { type: Schema.Types.ObjectId, ref: "Appointment", required: true },
  ],
  patients: [
    { type: Schema.Types.ObjectId, ref: "Patient", required: true },
  ],
});

module.exports = mongoose.model("Doctor", doctorSchema);
