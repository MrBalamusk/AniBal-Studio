import express from "express";
import Stripe from "stripe";
import { requireAuth } from "../middleware/auth.js";
import { Payment } from "../models/Payment.js";

const router = express.Router();

const stripe = process.env.STRIPE_SECRET_KEY ? new Stripe(process.env.STRIPE_SECRET_KEY) : null;

router.get("/plans", (_req, res) => {
  res.json({
    plans: [
      { name: "Free Plan", price: 0, features: ["Limited credits", "Watermark"] },
      { name: "Pro Plan", price: 39, features: ["More credits", "HD export"] },
      { name: "Studio Plan", price: 129, features: ["Unlimited renders", "4K export", "Voice cloning"] },
    ],
  });
});

router.post("/checkout", requireAuth, async (req, res) => {
  const { plan, amount } = req.body;

  if (!stripe) {
    const payment = await Payment.create({ user: req.user.id, plan, amount, status: "pending" });
    return res.json({ checkoutMode: "development", paymentId: payment.id });
  }

  const session = await stripe.checkout.sessions.create({
    mode: "payment",
    success_url: `${process.env.CLIENT_URL}/payments?status=success`,
    cancel_url: `${process.env.CLIENT_URL}/payments?status=cancelled`,
    line_items: [
      {
        price_data: {
          currency: "usd",
          unit_amount: Math.round(Number(amount) * 100),
          product_data: { name: `AniBal Studio ${plan}` },
        },
        quantity: 1,
      },
    ],
  });

  const payment = await Payment.create({ user: req.user.id, plan, amount, status: "pending", stripeSessionId: session.id });
  return res.json({ checkoutUrl: session.url, paymentId: payment.id });
});

export default router;