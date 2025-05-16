const Payment = require("../models/paymentModel");
const { validationResult } = require("express-validator");


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
 
    handleValidationErrors(req, res, next);

 
    await payment.save();
    res.status(201).send(payment);
  } catch (err) {
 
    next(err);
  }
};

exports.delete = async (req, res, next) => {
  try {

    handleValidationErrors(req, res, next);

   
    const payment = await Payment.findOneAndDelete({ _id: req.body.id });

    if (!payment) {
      return res.status(404).json({ message: "Payment not found, unable to delete." });
    }

    res.send(payment);
  } catch (err) {
 
    next(err);
  }
};

exports.update = async (req, res, next) => {
  try {
   
    const payment = await Payment.findOne({ _id: req.body.id });

    if (!payment) {
      return res.status(404).send({ message: "Payment not found." });
    }

    
    const updates = Object.keys(req.body);
    updates.forEach((update) => (payment[update] = req.body[update]));

    await payment.save();
    res.send(payment);
  } catch (err) {
    
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

        next(error);
      });
  } catch (error) {

    next(error);
  }
};
