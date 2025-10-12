const express = require("express");
const router = express.Router();
const { getUserById,updateUser,deleteUser } = require("../controllers/userController");
const checkAuth = require("../middleware/authMiddleware");

router.post("/getUserById",checkAuth, getUserById);
router.put("/updateUser", updateUser);
router.put("/deleteUser", deleteUser);

module.exports = router;
