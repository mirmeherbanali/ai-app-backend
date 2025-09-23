const jwt = require("jsonwebtoken");
const User = require("../models/User");
const { response } = require("../common/response/response");

const authMiddleware = async (req, res, next) => {
  try {
    const token = req.header("Authorization")?.replace("Bearer ", "");
    if (!token) return response(res, false, "No token provided");

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findOne({ _id: decoded.id, "tokens.token": token });

    if (!user) return response(res, false, "Unauthorized");

    req.user = user;
    req.token = token;
    next();
  } catch (error) {
    return response(res, false, "Invalid token");
  }
};

module.exports = authMiddleware;
