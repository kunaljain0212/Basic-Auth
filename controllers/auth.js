const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const User = require("../model/user");
const {
  registrationValidator,
  loginValidator,
} = require("../config/validation");

//Register controller
exports.register = async (req, res) => {
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
};

//Login controller
exports.login = async (req, res) => {
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
        const token = jwt.sign({ _id: userExists._id }, process.env.SECRET);
        res.status(200).header("Authorization", token).json({
          message: "User successfully logged in",
          token: token,
        });
      }
    }
  }
};

//Authorization controller
exports.isAuthenticated = (req, res, next) => {
  const token = req.header("Authorization");
  if (!token) {
    res.status(403).json({
      message: "ACCESS DENIED",
    });
  }
  try {
    const verifyToken = jwt.verify(token, process.env.SECRET);
    req.user = verifyToken._id;
    next();
  } catch (err) {
    res.status(403).json({
      message: "ACCESS DENIED/TOKEN NOT VERIFIED",
    });
  }
};
