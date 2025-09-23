const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const { response } = require("../common/response/response");

exports.register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) return response(res, false, "User already exists");

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ name, email, password: hashedPassword });
    await user.save();

    return response(res, true, "User registered successfully", user);
  } catch (error) {
    return response(res, false, error.message);
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) return response(res, false, "User not found");

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return response(res, false, "Invalid credentials");

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1d" });

    user.tokens.push({ token });
    await user.save();

    return response(res, true, "Login successful", { token, user });
  } catch (error) {
    return response(res, false, error.message);
  }
};

exports.logout = async (req, res) => {
  try {
    const { token } = req.body;
    const user = await User.findOne({ "tokens.token": token });

    if (!user) return response(res, false, "Invalid token");

    user.tokens = user.tokens.filter(t => t.token !== token);
    await user.save();

    return response(res, true, "Logged out successfully");
  } catch (error) {
    return response(res, false, error.message);
  }
};
