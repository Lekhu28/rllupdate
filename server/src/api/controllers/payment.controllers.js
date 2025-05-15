const Payment = require("../models/paymentModel");
const { validationResult } = require("express-validator");

// Utility function to handle validation errors
const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }
  next();
};

exports.create = async (req, res, next) => {
  const payment = new Payment(req.body);
  try {
    // Validate request
    handleValidationErrors(req, res, next);

    // Save payment
    await payment.save();
    res.status(201).send(payment);
  } catch (err) {
    // Handle errors during payment creation
    next(err);
  }
};

exports.delete = async (req, res, next) => {
  try {
    // Validate request
    handleValidationErrors(req, res, next);

    // Delete payment
    const payment = await Payment.findOneAndDelete({ _id: req.body.id });

    if (!payment) {
      return res.status(404).json({ message: "Payment not found, unable to delete." });
    }

    res.send(payment);
  } catch (err) {
    // Catch any errors and forward to the next middleware
    next(err);
  }
};

exports.update = async (req, res, next) => {
  try {
    // Find payment by ID
    const payment = await Payment.findOne({ _id: req.body.id });

    if (!payment) {
      return res.status(404).send({ message: "Payment not found." });
    }

    // Update payment
    const updates = Object.keys(req.body);
    updates.forEach((update) => (payment[update] = req.body[update]));

    await payment.save();
    res.send(payment);
  } catch (err) {
    // Handle errors during payment update
    next(err);
  }
};

exports.getAll = (req, res, next) => {
  try {
    Payment.find({})
      .populate("patient", ["first_name", "last_name"])
      .then((result) => {
        res.status(200).json(result);
      })
      .catch((error) => {
        // Forward database error to the next middleware
        next(error);
      });
  } catch (error) {
    // Catch any other errors
    next(error);
  }
};
