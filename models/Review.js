const mongoose = require("mongoose");

const ReviewSchema = mongoose.Schema(
  {
    rating: {
      type: Number,
      min: 1,
      max: 5,
      required: [true, "Please provide product review"],
    },
    title: {
      type: String,
      trim: true,
      required: [true, "Please provide review title"],
      maxLenght: [100, "Product name cannot be greater than 100 character"],
    },
    comment: {
      type: String,
      required: [true, "Please provide comment"],
    },
    user: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: true,
    },
    product: {
      type: mongoose.Types.ObjectId,
      ref: "Product",
      required: true,
    },
  },
  { Timestamp: true }
);
ReviewSchema.index({ product: 1, user: 1 }, { unique: true });

module.exports = mongoose.model("Review", ReviewSchema);
