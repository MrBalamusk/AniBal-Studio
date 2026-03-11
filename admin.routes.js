import express from "express";
import { requireAdmin, requireAuth } from "../middleware/auth.js";
import { Payment } from "../models/Payment.js";
import { Project } from "../models/Project.js";
import { UsageLog } from "../models/UsageLog.js";
import { User } from "../models/User.js";

const router = express.Router();

router.use(requireAuth, requireAdmin);

router.get("/overview", async (_req, res) => {
  const [users, payments, projects, usage] = await Promise.all([
    User.countDocuments(),
    Payment.countDocuments(),
    Project.countDocuments(),
    UsageLog.find().sort({ createdAt: -1 }).limit(20),
  ]);

  res.json({
    analytics: {
      users,
      payments,
      projects,
      recentUsage: usage,
    },
  });
});

export default router;