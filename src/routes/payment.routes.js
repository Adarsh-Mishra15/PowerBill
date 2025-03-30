import express from "express";
import { createPaymentOrder, getUserPayments, verifyPayment } from "../controllers/payment.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.post("/create-order",verifyJWT, createPaymentOrder);
router.post("/verify-payment",verifyJWT, verifyPayment);
router.get("/transactions",verifyJWT,getUserPayments)

export default router;
