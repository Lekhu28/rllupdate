const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const paymentSchema = new Schema({
  date: { type: Date },
  charges: { type: Number },
  method: { type: String, enum: ["cash_card", "credit_card", "insurance_card"] },
  patient: { type: Schema.Types.ObjectId, ref: "Patient" },
});

module.exports = mongoose.model("Payment", paymentSchema);
