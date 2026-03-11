import mongoose from "mongoose";

const paymentSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    plan: { type: String, required: true },
    amount: { type: Number, required: true },
    currency: { type: String, default: "usd" },
    status: { type: String, enum: ["pending", "paid", "failed", "released"], default: "pending" },
    stripeSessionId: { type: String, default: "" },
  },
  { timestamps: true },
);

export const Payment = mongoose.model("Payment", paymentSchema);