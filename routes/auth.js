const router = require("express").Router();
const User = require("../model/user");
const { registrationValidator } = require("../config/validation");

router.post("/register", async (req, res) => {
  const { error } = registrationValidator(req.body);

  if (error) {
    res.status(400).json(error.details[0].message);
  } else {
    const user = new User({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
    });
    try {
      const savedUser = await user.save();
      res.status(200).json(savedUser);
    } catch (err) {
      res.status(400).json(err);
    }
  }
});

module.exports = router;
