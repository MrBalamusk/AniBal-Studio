import express from "express";
import { requireAuth } from "../middleware/auth.js";
import { Project } from "../models/Project.js";

const router = express.Router();

router.use(requireAuth);

router.get("/", async (req, res) => {
  const projects = await Project.find({ user: req.user.id }).sort({ updatedAt: -1 });
  res.json({ projects });
});

router.post("/", async (req, res) => {
  const project = await Project.create({ ...req.body, user: req.user.id });
  res.status(201).json({ project });
});

router.patch("/:id", async (req, res) => {
  const project = await Project.findOneAndUpdate({ _id: req.params.id, user: req.user.id }, req.body, { new: true });
  res.json({ project });
});

export default router;