const router = require("express").Router();

router.post("/register", (req, res) => {
  res.send("Registered");
});

module.exports = router;
