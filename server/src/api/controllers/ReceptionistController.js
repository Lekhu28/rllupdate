const { validationResult } = require("express-validator");
const mongoose = require("mongoose");
const User = mongoose.model("User");


const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const error = new Error(errors.array().map(e => e.msg).join(", "));
    error.status = 422;
    return next(error);
  }
  next();
};

exports.getReceptionists = (req, res, next) => {
  User.find({ type: "Receptionist" })
    .then((result) => res.status(200).json(result))
    .catch(next); 
};


exports.getReceptionistById = (req, res, next) => {
  handleValidationErrors(req, res, next); 

  User.findOne({ _id: req.params.id, type: "Receptionist" })
    .then((data) => {
      if (!data) {
        return res.status(404).json({ message: "Receptionist not found" });
      }
      res.status(200).json(data);
    })
    .catch(next);  
};


exports.addReceptionist = (req, res, next) => {
  handleValidationErrors(req, res, next); 

  const { firstName, lastName, phoneNumber, age, email, password, address, profileImg, gender } = req.body;

  const userObject = new User({
    firstName,
    lastName,
    phoneNumber,
    age,
    email,
    password,
    address,
    profileImg,
    gender,
    type: "Receptionist",
  });

  userObject.save()
    .then(() => res.status(201).json({ message: "Receptionist added successfully" }))
    .catch(next);  
};


exports.updateReceptionist = (req, res, next) => {
  handleValidationErrors(req, res, next);  

  const { _id, firstName, lastName, phoneNumber, age, email, address, profileImg, gender } = req.body;

  if (!_id) {
    return res.status(400).json({ message: "ID is required for update" });
  }

  User.updateOne(
    { _id },
    {
      $set: {
        firstName,
        lastName,
        phoneNumber,
        age,
        email,
        address,
        profileImg,
        gender,
      },
    }
  )
    .then((result) => {
      if (result.nModified === 0) {
        return res.status(404).json({ message: "Receptionist not found or no changes made" });
      }
      res.status(200).json({ message: "Receptionist updated successfully" });
    })
    .catch(next); 
};


exports.deleteReceptionist = (req, res, next) => {
  handleValidationErrors(req, res, next);  

  User.deleteOne({ _id: req.params.id })
    .then((result) => {
      if (result.deletedCount === 0) {
        return res.status(404).json({ message: "Receptionist not found to delete" });
      }
      res.status(200).json({ message: "Receptionist deleted successfully" });
    })
    .catch(next);  
};
