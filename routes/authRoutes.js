const express = require("express");
const router = express.Router();
const { register, login, logout,getall } = require("../controllers/authController");
const checkAuth = require("../middleware/authMiddleware");

router.post("/register", register);
router.post("/login", login);
router.post("/logout", checkAuth, logout);
router.post("/getall", checkAuth, getall);

module.exports = router;
