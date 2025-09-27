const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const { response } = require("../common/response/response");
const getTokenFromRequest = require("../utils/getToken");

const register = async (req, res) => {
  try {
    const { firstName, lastName, email, password} = req.body;
    if (!firstName ) {
      return response(res, false, "firstName are required");
    }
    if (!lastName ) {
      return response(res, false, "lastName are required");
    }
    if (!email ) {
      return response(res, false, "email are required");
    }
    if (!password ) {
      return response(res, false, "password are required");
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) return response(res, false, "User already exists");

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({
      firstName,
      lastName,
      email,
      password: hashedPassword,
    });

    await user.save();
    return response(res, true, "User registered successfully", user.toJSON());
  } catch (error) {
    return response(res, false, error.message);
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email) return response(res, false, "Email is required");
    if (!password) return response(res, false, "password is required");

    const user = await User.findOne({ email });
    if (!user) return response(res, false, "User not found");

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return response(res, false, "Invalid credentials");

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET_KEY, { expiresIn: "1d" });
    const tokenExpiry = new Date(Date.now() + 24 * 60 * 60 * 1000);

    user.token = token;
    user.tokenExpiry = tokenExpiry;
    await user.save();

    return response(res, true, "Login successful", { token, user: user.toJSON() });
  } catch (error) {
    return response(res, false, error.message);
  }
};

const logout = async (req, res) => {
  try {
    const token = getTokenFromRequest(req);
    if (!token) return response(res, false, "Token not provided");

    const user = await User.findOne({ token });
    if (!user) return response(res, false, "Invalid token");

    user.token = null;
    user.tokenExpiry = null;
    await user.save();

    return response(res, true, "Logged out successfully");
  } catch (error) {
    return response(res, false, error.message);
  }
}

module.exports = { register, login, logout};
