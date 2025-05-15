const express = require("express");
const { auth, authRole } = require("../middlewares/auth");
const { validate } = require("../helpers/auth.validator");
const authController = require("../controllers/auth.controllers");
const router = express.Router();

router.post("/users/register", validate("createUser"), authController.register);

router.post("/users/login", validate("loginUser"), authController.login);

router.post("/users/logout", auth, authController.logout);

router.post("/users/logoutAll", auth, authController.logoutAll);

router.get("/users/me", auth, authController.userMe);

module.exports = router;
