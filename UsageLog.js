import mongoose from "mongoose";

const usageLogSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    tool: { type: String, required: true },
    creditsUsed: { type: Number, default: 0 },
    metadata: { type: mongoose.Schema.Types.Mixed, default: {} },
  },
  { timestamps: true },
);

export const UsageLog = mongoose.model("UsageLog", usageLogSchema);