// models/User.js
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  firstName: { type: String, required: true, trim: true },
  lastName: { type: String, required: true, trim: true },
  email: { type: String, trim: true, lowercase: true, unique: true, sparse: true, required: true },
  password: { type: String, trim: true, required: true },
  token: { type: String },
  tokenExpiry: { type: Date },
  created_by: { type: mongoose.Schema.Types.ObjectId, ref: "User", default: null },
  updated_by: { type: mongoose.Schema.Types.ObjectId, ref: "User", default: null },
}, { timestamps: true });

userSchema.methods.toJSON = function () {
  const obj = this.toObject();
  delete obj.password;
  delete obj.token;
  delete obj.tokenExpiry;
  return obj;
};

module.exports = mongoose.model("User", userSchema, "user");
