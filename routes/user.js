const router = require("express").Router();
const { isAuthenticated } = require("../controllers/auth");
const { getProfile, changePassword } = require("../controllers/user");

router.get("/profile", isAuthenticated, getProfile);
router.post("/profile/password", isAuthenticated, changePassword);

module.exports = router;
