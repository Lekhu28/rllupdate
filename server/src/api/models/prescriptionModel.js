const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PrescriptionSchema = new Schema({
  patient: { type: Schema.Types.ObjectId, required: true, ref: "Patient" },
  date: { type: Date, required: true },
  doctor: { type: Schema.Types.ObjectId, required: true, ref: "Doctor" },
  medicines: [
    {
      medicine: { type: Schema.Types.ObjectId, required: true, ref: "Medicine" },
      dose: { type: String, required: true },
    },
  ],
});

module.exports = mongoose.model("Prescription", PrescriptionSchema);
