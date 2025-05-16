const { body } = require("express-validator");

exports.validate = (method) => {
  switch (method) {
    case "createPayment": {
      return [
        body("date", "select date for appointment").exists(),
        body("charges", "please provide charges for appointment").exists(),
        body("method", "please provide correct method for payment")
          .exists()
          .isIn(["cash_card", "credit_card", "insurance_card"]),
      ];
    }
    case "deletePayment": {
      return [body("id", "please provide id for payment to delete").exists()];
    }
    case "updatePayment": {
      return [
        body("id", "please provide id for payment to update").exists(),
        body("charges", "please provide charges for appointment").optional(),
        body("method", "please provide correct method for payment")
          .optional()
          .isIn(["cash_card", "credit_card", "insurance_card"]),
      ];
    }
  }
};
