const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema(
  {
    adminId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Admin", 
      required: true,
    },
    categoryName: {
      type: String,
      required: true,
      trim: true,
    },
    categoryDescription: {
      type: String,
      trim: true,
    },
    status: { type: String, enum: ["Active", "Inactive", "Deleted"], default: "Active" },

  },
  {
    timestamps: true, 
  }
);

module.exports = mongoose.model("Category", categorySchema);
