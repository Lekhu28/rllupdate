const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

const auth = async (req, res, next) => {
  try {
    const token = req.header("Authorization").replace("Bearer ", "");
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findOne({
      _id: decoded._id,
      "tokens.token": token,
    });

    if (!user) {
      throw new Error();
    }

    req.token = token;
    req.user = user;
    next();
  } catch (e) {
    res.status(401).send({ error: "Please authenticate." });
  }
};

function authRole(permissions) {
  return (req, res, next) => {
    const userRole = req.user.type;
    if (permissions.includes(userRole.toLowerCase())) {
      next();
    } else {
      res.status(401);
      return res.json({
        message:
          "Not allowed, you don't have permissions to access this routes",
      });
    }
  };
}

const ROLE = {
  ADMIN: "admin",
  DOCTOR: "doctor",
  RECEPTIONIST: "receptionist",
};

module.exports = { auth, authRole, ROLE };
