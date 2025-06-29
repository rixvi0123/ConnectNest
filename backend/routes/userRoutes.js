const express = require("express");
const {
  registerUser,
  loginUser,
  currentUser,
  getResetHint,
  verifyResetAndChangePassword
} = require("../controllers/userController");

const validateToken = require("../middleware/validateTokenHandler");

const router = express.Router();

// 🔐 Auth
router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/current", validateToken, currentUser);

// 🔁 Password Reset
router.post("/reset/request", getResetHint); // show resetHint
router.post("/reset/verify", verifyResetAndChangePassword); // verify resetKey + update password

module.exports = router;
