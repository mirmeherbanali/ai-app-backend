const express = require("express");
const router = express.Router();

const auth = require("./routes/authRoutes");
const user = require("./routes/userRoutes")
const adminUser = require("./routes/adminUserRoutes")
const category = require("./routes/categoryRoutes")




router.use("/api/auth", auth);
router.use("/api/user", user);
router.use("/api/adminUser", adminUser);
router.use("/api/category", category);

module.exports = router;
