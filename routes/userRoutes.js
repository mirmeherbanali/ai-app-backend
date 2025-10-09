const express = require("express");
const router = express.Router();
const { getUserById,updateUser } = require("../controllers/userController");
const checkAuth = require("../middleware/authMiddleware");

router.post("/getUserById", getUserById);
router.put("/updateUser", updateUser);

module.exports = router;
