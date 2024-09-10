const express = require("express");
const {
  registerUser,
  loginUser,
  logoutUser,
  getUserDetails,
} = require("../controllers/authController");
const { protect } = require("../middlewares/authMiddleware"); // Import the protect middleware

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/logout", logoutUser);
router.get("/user", protect, getUserDetails); // Apply the protect middleware

module.exports = router;
