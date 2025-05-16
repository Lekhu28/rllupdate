const express = require("express");
const router = express.Router();
const { body, param } = require("express-validator");
const controller = require("./../controllers/appointmentController");


router.get("", controller.listappointments);


router.get("/:_id", [
  param("_id").isMongoId().withMessage("_id Should be ObjectID")
], controller.getappointment);


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


router.delete(
  "",
  [body("id").isMongoId().withMessage("Id should be ObjectID")],
  controller.deleteappointment
);

module.exports = router;
