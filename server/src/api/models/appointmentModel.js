const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const appointmentSchema = new Schema({
  time: { type: Date, required: true },
  bill: {
    type: Schema.Types.ObjectId,
    ref: "Payment",
    // If you want to make it required, uncomment the line below
    // required: true,
  },
  patient: { type: Schema.Types.ObjectId, ref: "Patient", required: true },
  doctor: { type: Schema.Types.ObjectId, ref: "Doctor", required: true },
  condition: { type: String, required: true },
});

module.exports = mongoose.model("Appointment", appointmentSchema);
