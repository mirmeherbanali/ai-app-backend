const express = require("express");
const router = express.Router();
const { addAdminUser} = require("../controllers/adminUserController");
const checkAuth = require("../middleware/authMiddleware");

router.post("/addAdminUser", addAdminUser);


module.exports = router;
