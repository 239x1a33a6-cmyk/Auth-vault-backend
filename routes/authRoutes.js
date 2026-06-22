const express = require("express");
const router = express.Router();
const {
  handleRegister,
  handleLogin,
  getProfile,
  handleLogout,
} = require("../controllers/authController");

const { authMiddleware } = require("../middlewares/authMiddleware");
const { roleMiddleware } = require("../middlewares/roleMiddleware");

router.post("/register", handleRegister);
router.post("/login", handleLogin);
router.get("/profile", authMiddleware, getProfile);
router.post("/logout", authMiddleware, handleLogout);
// router.get("/profile", authMiddleware, roleMiddleware("ADMIN"), getProfile);

module.exports = router;
