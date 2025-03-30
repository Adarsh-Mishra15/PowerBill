import express from "express";
import { generateBill} from "../controllers/bill.controller.js";
import { verifyAdmin, verifyJWT } from "../middlewares/auth.middleware.js";

const router = express.Router();

// Only admin can generate bills
router.post("/generate", verifyJWT, verifyAdmin, generateBill);


export default router;
