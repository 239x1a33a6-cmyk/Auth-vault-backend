const express = require("express");
const router = express.Router();

const { authMiddleware } = require("../middlewares/authMiddleware");
const { roleMiddleware } = require("../middlewares/roleMiddleware");
const { getAllUsers, deleteUser } = require("../controllers/adminControllers");

router.get("/users", authMiddleware, roleMiddleware("ADMIN"), getAllUsers);
router.delete("/user/:id", authMiddleware, roleMiddleware("ADMIN"), deleteUser);

module.exports = router;
