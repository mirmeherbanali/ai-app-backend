const { response } = require("../common/response/response");
const Category = require("../models/Category");
const Admin = require("../models/AdminUser");


const createCategory = async (req, res) => {
  try {
    const { adminId, categoryName } = req.body;

    if (!adminId) return response(res, false, "AdminId is required");

    const existingAdmin = await Admin.findOne({ _id: adminId });
    if (!existingAdmin) return response(res, false, "admin not found");
    if (!categoryName) return response(res, false, "Category name is required");

    const existing = await Category.findOne({ categoryName, adminId });
    if (existing) return response(res, false, "Category already exists");

    const category = new Category({ adminId, categoryName });
    await category.save();

    return response(res, true, "Category created successfully", category);
  } catch (error) {
    return response(res, false, error.message);
  }
};

const getAllCategories = async (req, res) => {
  try {
    const categories = await Category.find().populate("adminId", "firstName lastName email");
    return response(res, true, "All categories fetched", categories);
  } catch (error) {
    return response(res, false, error.message);
  }
};




const updateCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const { categoryName } = req.body;

    if (!categoryName) return response(res, false, "Category name is required");

    const updated = await Category.findByIdAndUpdate(
      id,
      { categoryName },
      { new: true }
    );

    if (!updated) return response(res, false, "Category not found");

    return response(res, true, "Category updated successfully", updated);
  } catch (error) {
    return response(res, false, error.message);
  }
};


const deleteCategory = async (req, res) => {
  try {
    const { id } = req.params;

    const deleted = await Category.findByIdAndDelete(id);
    if (!deleted) return response(res, false, "Category not found");

    return response(res, true, "Category deleted successfully");
  } catch (error) {
    return response(res, false, error.message);
  }
};

module.exports = {
  createCategory,
  getAllCategories,
  updateCategory,
  deleteCategory,
};
