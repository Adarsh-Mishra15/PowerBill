import express from "express";
import { sendCalamityAlert, sendPaymentReminders } from "../controllers/notification.controller.js";
import {verifyJWT, verifyAdmin } from "../middlewares/auth.middleware.js";

const router = express.Router();

// ✅ Route for admin to send calamity notifications
router.post("/calamity-alert", verifyJWT, verifyAdmin, sendCalamityAlert);
router.get("/bill-alert",verifyJWT,verifyAdmin,sendPaymentReminders)
export default router;
