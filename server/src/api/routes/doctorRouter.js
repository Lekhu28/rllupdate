const express = require("express");
const doctorController = require("./../controllers/doctorController");
const { param, body, query } = require("express-validator");
const router = express.Router();

const mongoose = require("mongoose");
const User = mongoose.model("User");


router.get("", doctorController.getDoctors);


router.get(
  "/:id",
  [param("id").isMongoId().withMessage("ID should be ObjectId")],
  doctorController.getDoctorById
);


router.post(
  "",
  [
    body("_id.firstName").isAlpha().withMessage("First name should be string"),
    body("_id.lastName").isAlpha().withMessage("Last name should be string"),
    body("_id.phoneNumber")
      .isInt()
      .isLength({ min: 12, max: 12 })
      .withMessage("Invalid phone number")
      .custom((value, { req }) => {
        return User.findOne({
          phoneNumber: value
        }).then((user) => {
          if (user) {
            throw new Error("Phone number already exist");
          }
        });
      }),
    body("_id.age").custom((value, { req }) => {
      if (value >= 20 && value <= 100) {
        return true;
      }
      throw new Error("Invalid age");
    }),
    body("_id.email")
      .isEmail()
      .withMessage("Invalid Email")
      .custom((value, { req }) => {
        return User.findOne({
          email: value
        }).then((user) => {
          if (user) {
            throw new Error("Email already exist");
          }
        });
      }),
    body("_id.password")
      .isLength({ min: 7 })
      .withMessage("Invalid Password"),
    body("_id.address")
      .isLength({ min: 3 })
      .withMessage("invalid address"),
    body('_id.profileImg').not().isEmpty().withMessage("profileImg path should be string"),
    body("_id.gender").custom((value, { req }) => {
      if (value == "male" || value == "female") {
        return true;
      }
      throw new Error("invalid gender");
    }),
    body("speciality").not().isEmpty().withMessage("speciality should be string"),
  ],
  doctorController.addDoctor
);


router.put(
  "",
  [
    body("_id._id").isMongoId().withMessage("ID should be ObjectId"),
    body("_id.firstName").isAlpha().withMessage("First name should be string"),
    body("_id.lastName").isAlpha().withMessage("Last name should be string"),
    body("_id.phoneNumber")
      .isInt()
      .isLength({ min: 12, max: 12 })
      .withMessage("Invalid phone number")
      .custom((value, { req }) => {
        return User.findOne({
          phoneNumber: value,
          _id: { $nin: [req.body._id._id] },
        }).then((user) => {
          if (user) {
            throw new Error("Phone number already exist");
          }
        });
      }),
    body("_id.age").custom((value, { req }) => {
      if (value >= 20 && value <= 100) {
        return true;
      }
      throw new Error("Invalid age");
    }),
    body("_id.email")
      .isEmail()
      .withMessage("Invalid Email")
      .custom((value, { req }) => {
        return User.findOne({
          email: value,
          _id: { $nin: [req.body._id._id] },
        }).then((user) => {
          if (user) {
            throw new Error("Email already exist");
          }
        });
      }),
    body("_id.address")
      .isLength({ min: 3 })
      .withMessage("invalid address"),
    body('_id.profileImg').not().isEmpty().withMessage("profileImg path should be string"),
    body("_id.gender").custom((value, { req }) => {
      if (value == "male" || value == "female") {
        return true;
      }
      throw new Error("invalid gender");
    }),
    body("speciality").not().isEmpty().withMessage("speciality should be string"),
  ],
  doctorController.updateDoctor
);


router.delete(
  "/:id",
  [param("id").isMongoId().withMessage("ID should be ObjectId")],
  doctorController.deleteDoctor
);

router.put(
  "/addAppointmentToDoctor",
  [
    body("id").isMongoId().withMessage("ID should be ObjectId"),
    body("appointment")
      .isMongoId()
      .withMessage("Appointment should be array of ObjectId"),
  ],
  doctorController.addAppointmentToDoctor
);


router.put(
  "/removeAppointmentFromDoctor",
  [
    body("id").isMongoId().withMessage("ID should be ObjectId"),
    body("appointment")
      .isMongoId()
      .withMessage("Appointment should be array of ObjectId"),
  ],
  doctorController.removeAppointmentFromDoctor
);


router.put(
  "/addPatientToDoctor",
  [
    body("id").isMongoId().withMessage("ID should be ObjectId"),
    body("patient")
      .isMongoId()
      .withMessage("Patient should be array of ObjectId"),
  ],
  doctorController.addPatientToDoctor
);


router.put(
  "/removePatientFromDoctor",
  [
    body("id").isMongoId().withMessage("ID should be ObjectId"),
    body("patient")
      .isMongoId()
      .withMessage("Patient should be array of ObjectId"),
  ],
  doctorController.removePatientFromDoctor
);

module.exports = router;
