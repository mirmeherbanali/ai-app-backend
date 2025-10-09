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
  },
  {
    timestamps: true, 
  }
);

module.exports = mongoose.model("Category", categorySchema);
