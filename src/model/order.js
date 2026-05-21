import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,

  email: {
    type: String,
    required: true,
  },

  userEmail: {
    type: String,
    required: true,
  },

  phone: String,
  address: String,
  city: String,

  paymentMethod: {
    type: String,
    default: "COD",
  },

  items: [
    {
      _id: String,
      name: String,
      image: String,
      price: Number,
      quantity: Number,
    },
  ],

  subtotal: Number,
  total: Number,

  status: {
    type: String,
    enum: [
      "Pending",
      "Processing",
      "Shipped",
      "Delivered",
      "Cancelled",
      "Returned",
    ],
    default: "Pending",
  },

  returnRequested: {
    type: Boolean,
    default: false,
  },

  cancelRequested: {
    type: Boolean,
    default: false,
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.models.Order ||
  mongoose.model("Order", orderSchema);