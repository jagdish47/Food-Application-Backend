import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    foods: [{ type: mongoose.Schema.Types.ObjectId, ref: "Foods" }],
    payment: {},
    buyer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    status: {
      type: String,
      enum: ["preparing", "prepare", "on the way", "delivered"],
      default: "preparing",
    },
  },
  { timestamps: true }
);

export default mongoose.model("Orders", orderSchema);
