// noinspection JSCheckFunctionSignatures
const express = require("express");
const router = express.Router();

const { auth, authRole, ROLE } = require("../middlewares/auth");
const paymentController = require("../controllers/payment.controllers");
const { validate } = require("../helpers/payment.validator");

router.post(
  "/payments",
  auth,
  authRole([ROLE.ADMIN, ROLE.RECEPTIONIST]),
  validate("createPayment"),
  paymentController.create
);

router.delete(
  "/payments",
  auth,
  authRole([ROLE.ADMIN, ROLE.RECEPTIONIST]),
  validate("deletePayment"),
  paymentController.delete
);
router.patch(
  "/payments",
  auth,
  authRole([ROLE.ADMIN, ROLE.RECEPTIONIST]),
  validate("updatePayment"),
  paymentController.update
);

router.get(
  "/payments",
  auth,
  paymentController.getAll
);

module.exports = router;
