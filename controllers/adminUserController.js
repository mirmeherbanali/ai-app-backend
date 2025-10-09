const bcrypt = require("bcryptjs");
const Admin = require("../models/AdminUser");
const User = require("../models/User"); 
const { response } = require("../common/response/response");

const addAdminUser = async (req, res) => {
  try {
    const { firstName, lastName, email, password, adminId } = req.body;

    if (!firstName || !lastName || !email || !password) {
      return response(res, false, "All required fields must be provided");
    }
    if (!adminId) {
      return response(res, false, "adminId is required");
    }
    

    const existingAdmin = await Admin.findOne({ email });
    if (existingAdmin) {
      return response(res, false, "Admin with this email already exists");
    }

    if (adminId) {
      const user = await User.findById(adminId);
      if (!user || user.userType !== "Admin") {
        return response(res, false, "adminId must belong to a User with userType 'Admin'");
      }
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const admin = await Admin.create({
      firstName,
      lastName,
      email,
      password: hashedPassword,
      adminId,
      status:"Active"
    });

    return response(res, true, "Admin created successfully", admin);
  } catch (error) {
    return response(res, false, error.message);
  }
};


module.exports = {
  addAdminUser,
};
