const router = require("express").Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../model/user");
const {
  registrationValidator,
  loginValidator,
} = require("../config/validation");
const { register, login } = require("../controllers/auth");

//Register route
router.post("/register", register);
//Login route
router.post("/login", login);

module.exports = router;
