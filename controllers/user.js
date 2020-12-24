const bcrypt = require("bcryptjs");
const User = require("../model/user");
const { passwordValidator } = require("../config/validation");

//Get profile controller
exports.getProfile = async (req, res) => {
  const user = await User.findOne({ _id: req.user_id });
  res.status(200).json({
    profile: "This is your profile",
    user: {
      name: user.name,
      email: user.email,
    },
  });
};

//Change password controller
exports.changePassword = async (req, res) => {
  const user = await User.findOne({ _id: req.user });
  const validatePassword = await bcrypt.compare(
    req.body.oldPassword,
    user.password
  );
  if (!validatePassword) {
    res.status(200).json({
      message: "Invalid old password",
    });
  } else {
    const { error } = passwordValidator(req.body);
    if (error) {
      res.status(400).json({
        error: "Invalid new password",
      });
    } else {
      const salt = user.salt;
      const newHashedPassword = await bcrypt.hash(req.body.newPassword, salt);

      User.findByIdAndUpdate(
        { _id: req.user },
        { password: newHashedPassword },
        { new: true, useFindAndModify: false },
        (error, user) => {
          if (error) {
            res.status(400).json({
              error: "DATABASE ERROR: " + error,
            });
          }
          res.status(200).json({ message: "Password successfully changed" });
        }
      );
    }
  }
};
