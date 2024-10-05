const mongoose = require("mongoose");

const SingleItemCartItemSchema = mongoose.Schema({
  name: { type: String, required: true },
  image: { type: String, required: true },
  price: { type: String, required: true },
  amount: { type: String, required: true },
  user: {
    type: mongoose.Schema.ObjectId,
    ref: "Product",
    required: true,
  },
});

const OrderSchema = mongoose.Schema(
  {
    tax: { type: Number, required: true },
    shippingFee: { type: Number, required: true },
    subtotal: { type: Number, required: true },
    total: { type: Number, required: true },
    orderItems: [SingleItemCartItemSchema],
    status: {
      type: String,
      enum: ["pending", "failed", "delivered", "paid", "cancelled"],
      default: "pending",
    },
    user: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
      required: true,
    },
    clientSecret: { type: String, required: true },
    paymentId: { type: String },
  },
  {
    Timestamp: true,
  }
);

module.exports = mongoose.model("Order", OrderSchema);
