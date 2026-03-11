import mongoose from "mongoose";

const projectSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    title: { type: String, required: true, trim: true },
    kind: { type: String, enum: ["movie", "series", "episode", "scene"], required: true },
    status: { type: String, enum: ["draft", "storyboard", "in-production", "rendering", "complete"], default: "draft" },
    prompt: { type: String, default: "" },
    style: { type: String, default: "Cyberpunk Anime" },
    scenes: [{ title: String, duration: Number, status: String }],
    assets: [{ type: String }],
    output: {
      resolution: { type: String, default: "1080p" },
      frameRate: { type: String, default: "30fps" },
      format: { type: String, default: "MP4" },
    },
  },
  { timestamps: true },
);

export const Project = mongoose.model("Project", projectSchema);