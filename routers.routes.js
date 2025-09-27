const express = require("express");
const router = express.Router();

const auth = require("./routes/authRoutes");




router.use("/api/auth", auth);

module.exports = router;
