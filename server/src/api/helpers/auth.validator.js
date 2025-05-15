const { body } = require("express-validator");

exports.validate = (method) => {
  switch (method) {
    case "createUser": {
      return [
        body("firstName", "first_name doesnt exists").exists(),
        body("lastName", "last_name not exists").exists(),
        body(
          "phoneNumber",
          "you have to provide phone number to contact"
        ).exists(),
        body("age").exists(),
        body("gender").exists(),
        body("type").exists().isIn(["Doctor", "Receptionist", "Admin"]),
        body("password").exists(),
      ];
    }
    case "loginUser": {
      return [
        body("phoneNumber", "please enter phone number for login").exists(),
        body("password", "you have to enter password").exists(),
      ];
    }
  }
};
