const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const clinicServicesSchema = new Schema({
  name: { type: String, required: true },
  team: [{ type: Schema.Types.ObjectId, ref: "Doctor", required: true }],
});

module.exports = mongoose.model("ClinicService", clinicServicesSchema);
