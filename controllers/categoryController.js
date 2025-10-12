const { response } = require("../common/response/response");
const Category = require("../models/Category");
const Admin = require("../models/AdminUser");

const createCategory = async (req, res) => {
  try {
    const { adminId, categoryName, categoryDescription } = req.body;

    if (!adminId) return response(res, false, "AdminId is required");
    if (!categoryName) return response(res, false, "Category name is required");

    const existingAdmin = await Admin.findOne({
      _id: adminId,
      status: "Active",
    });
    if (!existingAdmin)
      return response(res, false, "Admin not found or not active");

    const existingCategory = await Category.findOne({ adminId, categoryName });
    if (existingCategory)
      return response(res, false, "Category already exists");

    const category = new Category({
      adminId,
      categoryName,
      categoryDescription: categoryDescription || "",
      status: "Active",
    });

    await category.save();

    return response(res, true, "Category created successfully", category);
  } catch (error) {
    return response(res, false, error.message);
  }
};

const getAllCategories = async (req, res) => {
  try {
    const categories = await Category.find().populate(
      "adminId",
      "firstName lastName email"
    );

    return response(res, true, "All categories fetched", categories);
  } catch (error) {
    return response(res, false, error.message);
  }
};

const updateCategory = async (req, res) => {
  try {
    const { id, adminId, categoryName, categoryDescription } = req.body;
    if (!id) return response(res, false, "Category ID is required");
    if (!adminId) return response(res, false, "AdminId is required");
    const existingAdmin = await Admin.findOne({
      _id: adminId,
      status: "Active",
    });
    if (!existingAdmin)
      return response(res, false, "Admin not found or not active");
    const updateData = {};
    if (categoryName) updateData.categoryName = categoryName;
    if (categoryDescription !== undefined)
      updateData.categoryDescription = categoryDescription;
    const updated = await Category.findByIdAndUpdate(id, updateData, {
      new: true,
    });
    if (!updated) return response(res, false, "Category not found");

    return response(res, true, "Category updated successfully", updated);
  } catch (error) {
    return response(res, false, error.message);
  }
};

const deleteCategory = async (req, res) => {
  try {
    const { id, adminId } = req.body;

    if (!id) return response(res, false, "CategoryId is required");
    if (!adminId) return response(res, false, "AdminId is required");
    const admin = await Admin.findOne({
      _id: adminId,
      status: "Active",
      userType: "Admin",
    });
    if (!admin)
      return response(
        res,
        false,
        "Admin not found, inactive, or not authorized"
      );
    const category = await Category.findById(id);
    if (!category) return response(res, false, "Category not found");
    category.status = "Deleted";
    await category.save();

    return response(res, true, "Category deleted successfully", category);
  } catch (error) {
    return response(res, false, error.message);
  }
};
const getCategoryById = async (req, res) => {
  try {
    const { categoryId } = req.body;

    if (!categoryId) return response(res, false, "CategoryId is required");

    const category = await Category.findOne({ _id: categoryId }).populate(
      "adminId",
      "firstName lastName email"
    );

    if (!category) return response(res, false, "Category not found");

    return response(res, true, "Category fetched successfully", category);
  } catch (error) {
    return response(res, false, error.message);
  }
};

module.exports = {
  createCategory,
  getAllCategories,
  updateCategory,
  deleteCategory,
  getCategoryById,
};
