const express = require("express");
const router = express.Router();
const { body, param } = require("express-validator");
const controller = require("./../controllers/appointmentController");

// -------------   Get Appointments -----------------
router.get("", controller.listappointments);

// -------------   Get appointment By Id ----------- 
router.get("/:_id", [
  param("_id").isMongoId().withMessage("_id Should be ObjectID")
], controller.getappointment);

// -------------  Add Appointment --------------
router.post(
  "",
  [
    body("time").isDate().withMessage("Please enter valid time"),
    body("bill")
      .isMongoId()
      .withMessage("Please enter valid bill number")
      .optional(),
    body("patient")
      .isMongoId()
      .withMessage("Please enter valid patient number"),
    body("doctor").isMongoId().withMessage("Please enter valid doctor"),
    body("condition").isString().withMessage("Not a valid condition"),
  ],
  controller.addappointment
);

// -------------- Update Appointment ----------
router.put(
  "",
  [
    body("time").isDate().withMessage("Please enter valid time"),
    body("bill")
      .isMongoId()
      .withMessage("Please enter valid bill number")
      .optional(),
    body("patient")
      .isMongoId()
      .withMessage("Please enter valid patient number"),
    body("doctor").isMongoId().withMessage("Please enter valid doctor"),
    body("condition").isString().withMessage("Not a valid condition"),
  ],
  controller.updateappointment
);

// ------------- Delete Appointment -----------
router.delete(
  "",
  [body("id").isMongoId().withMessage("Id should be ObjectID")],
  controller.deleteappointment
);

module.exports = router;
