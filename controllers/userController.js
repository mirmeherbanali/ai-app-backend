const bcrypt = require("bcryptjs");
const User = require("../models/User");
const { response } = require("../common/response/response");



const getUserById = async (req, res) => {
  try {
    const { id } = req.body;

    if (!id) return response(res, false, "User ID is required");

    const user = await User.findById(id);
    if (!user) return response(res, false, "User not found");

    return response(res, true, "User fetched successfully", user.toJSON());
  } catch (error) {
    return response(res, false, error.message);
  }
};

const updateUser = async (req, res) => {
  try {
    const {
      id,
      firstName,
      lastName,
      email,
      companyEmail,
      companyName,
      companyWebsite,
      password,
      role,
      industry,
      country,
    } = req.body;

    if (!id) return response(res, false, "User ID is required");

    const user = await User.findById(id);
    if (!user) return response(res, false, "User not found");
    let updatedPassword = user.password;
    if (password) {
      updatedPassword = await bcrypt.hash(password, 10);
    }

    user.firstName = firstName || user.firstName;
    user.lastName = lastName || user.lastName;
    user.email = email || user.email;
    user.companyEmail = companyEmail || user.companyEmail;
    user.companyName = companyName || user.companyName;
    user.companyWebsite = companyWebsite || user.companyWebsite;
    user.password = updatedPassword;
    user.role = role || user.role;
    user.industry = industry || user.industry;
    user.country = country || user.country;
    user.updated_by = req.userId || null;

    await user.save();

    return response(res, true, "User updated successfully", user.toJSON());
  } catch (error) {
    return response(res, false, error.message);
  }
};



module.exports = {  getUserById, updateUser };