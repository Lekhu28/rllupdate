const { validationResult } = require("express-validator");
const Prescription = require("../models/prescriptionModel");

// Utility function to handle validation errors
const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const error = new Error(errors.array().map(e => e.msg).join(", "));
    error.status = 422;
    return next(error);
  }
  next();
};

//---------------------------- Get All Prescriptions
exports.getPrescriptions = (req, res, next) => {
  Prescription.find({})
    .populate({ path: "medicines.medicine" })
    .populate({ path: "doctor" })
    .populate({ path: "doctor._id", model: "User" })
    .populate({ path: "patient" })
    .then(result => res.status(200).json(result))
    .catch(next);  // Pass errors to the next middleware
};

//---------------------------- Get Prescription by ID
exports.getPrescription = (req, res, next) => {
  Prescription.findOne({ _id: req.params._id })
    .populate({ path: "medicines.medicine" })
    .populate({ path: "doctor" })
    .populate({ path: "doctor._id", model: "User" })
    .populate({ path: "patient" })
    .then(result => {
      if (!result) {
        return res.status(404).json({ message: "Prescription not found" });
      }
      res.status(200).json(result);
    })
    .catch(next);
};

//---------------------------- Add Prescription
exports.createPrescription = (req, res, next) => {
  handleValidationErrors(req, res, next); // Handle validation errors

  const { doctor, patient, medicines, date } = req.body;
  
  const prescription = new Prescription({ doctor, patient, medicines, date });
  
  prescription.save()
    .then(() => res.status(201).json({ message: "Prescription Added", prescription }))
    .catch(next);
};

//---------------------------- Update Prescription
exports.updatePrescription = (req, res, next) => {
  const { _id, medicines } = req.body;

  if (!_id) {
    return res.status(400).json({ message: "Prescription ID is required for update" });
  }

  Prescription.findByIdAndUpdate(_id, { $set: { medicines } }, { new: true })
    .then(result => {
      if (!result) {
        return res.status(404).json({ message: "Prescription not found for update" });
      }
      res.status(200).json({ message: "Prescription Updated", result });
    })
    .catch(next);
};

//---------------------------- Delete Prescription
exports.deletePrescription = (req, res, next) => {
  handleValidationErrors(req, res, next); // Handle validation errors

  Prescription.findByIdAndDelete(req.params._id)
    .then(result => {
      if (!result) {
        return res.status(404).json({ message: "Prescription not found to delete" });
      }
      res.status(200).json({ message: "Prescription Deleted", result });
    })
    .catch(next);
};

//---------------------------- Get Patient's Prescriptions
exports.getPatientPrescription = (req, res, next) => {
  Prescription.find({ patient: req.params.Pid })
    .populate({
      path: 'medicines',
      populate: { path: 'medicine' }
    })
    .populate({
      path: "doctor",
      populate: { path: "_id", model: "User" }
    })
    .populate({ path: "patient" })
    .then(result => res.status(200).json(result))
    .catch(next);
};
