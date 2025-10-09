const express = require("express");
const router = express.Router();
const {  createCategory,getAllCategories} = require("../controllers/categoryController");
const checkAuth = require("../middleware/authMiddleware");

router.post("/createCategory", createCategory);
router.post("/getAllCategories", getAllCategories);


module.exports = router;
