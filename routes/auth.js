const router = require("express").Router();
const bcrypt = require("bcryptjs");
const User = require("../model/user");
const {
  registrationValidator,
  loginValidator,
} = require("../config/validation");

//Register route
router.post("/register", async (req, res) => {
  const { error } = registrationValidator(req.body);

  if (error) {
    res.status(400).json(error.details[0].message);
  } else {
    const salt = await bcrypt.genSalt(10);
    const encry_password = await bcrypt.hash(req.body.password, salt);

    const user = new User({
      name: req.body.name,
      email: req.body.email,
      password: encry_password,
      salt: salt,
    });
    try {
      const savedUser = await user.save();
      res.status(200).json(savedUser);
    } catch (err) {
      res
        .status(400)
        .json(
          "Eiether Email already exists or some serve error occurred: " +
            err.name
        );
    }
  }
});

//Login route
router.post("/login", async (req, res) => {
  const { error } = loginValidator(req.body);

  if (error) {
    res.status(400).json(error.details[0].message);
  } else {
    const userExists = await User.findOne({ email: req.body.email });
    if (!userExists) {
      res.status(400).json({
        message: "User doesn't exist",
      });
    } else {
      const validatePassword = await bcrypt.compare(
        req.body.password,
        userExists.password
      );
      if (!validatePassword) {
        res.status(400).json({
          message: "Invalid password",
        });
      } else {
        res.status(200).json({
          message: "User successfully logged in",
        });
      }
    }
  }
});

module.exports = router;
