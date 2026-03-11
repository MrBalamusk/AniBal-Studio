import mongoose from "mongoose";

const notificationSchema = new mongoose.Schema(
  {
    renderComplete: { type: Boolean, default: true },
    paymentReceipts: { type: Boolean, default: true },
    creditWarnings: { type: Boolean, default: true },
    adminAnnouncements: { type: Boolean, default: false },
  },
  { _id: false },
);

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    passwordHash: { type: String, required: true },
    role: { type: String, enum: ["user", "admin"], default: "user" },
    credits: { type: Number, default: 500 },
    profilePhoto: { type: String, default: "" },
    notifications: { type: notificationSchema, default: () => ({}) },
    authProviders: {
      googleId: { type: String, default: "" },
      discordId: { type: String, default: "" },
    },
  },
  { timestamps: true },
);

export const User = mongoose.model("User", userSchema);