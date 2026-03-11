import express from "express";
import { requireAuth } from "../middleware/auth.js";
import { UsageLog } from "../models/UsageLog.js";
import {
  createCharacter,
  createSceneImage,
  createSoundDesign,
  createVideoRender,
  createVoiceTrack,
} from "../services/ai.service.js";

const router = express.Router();

router.use(requireAuth);

router.post("/generate-scene", async (req, res) => {
  const output = await createSceneImage(req.body);
  await UsageLog.create({ user: req.user.id, tool: "scene-generator", creditsUsed: 25, metadata: req.body });
  res.json(output);
});

router.post("/generate-character", async (req, res) => {
  const output = await createCharacter(req.body);
  await UsageLog.create({ user: req.user.id, tool: "character-generator", creditsUsed: 20, metadata: req.body });
  res.json(output);
});

router.post("/generate-voice", async (req, res) => {
  const output = await createVoiceTrack(req.body);
  await UsageLog.create({ user: req.user.id, tool: "voice-studio", creditsUsed: 10, metadata: req.body });
  res.json(output);
});

router.post("/generate-sfx", async (req, res) => {
  const output = await createSoundDesign(req.body);
  await UsageLog.create({ user: req.user.id, tool: "sound-library", creditsUsed: 5, metadata: req.body });
  res.json(output);
});

router.post("/render-video", async (req, res) => {
  const output = await createVideoRender(req.body);
  await UsageLog.create({ user: req.user.id, tool: "render-studio", creditsUsed: 50, metadata: req.body });
  res.json(output);
});

router.post("/generate-story", async (req, res) => {
  res.json({
    provider: "script-writer-ai",
    title: req.body.title || "Untitled Anime Story",
    outline: [
      "Act I: Introduce hero and conflict.",
      "Act II: Reveal rival, power escalation, and emotional stakes.",
      "Act III: Climactic fight, payoff, and sequel hook.",
    ],
  });
});

export default router;