import express from "express";
import {
    addEnergyUsage,
    getEnergyUsageByUser,
    getUsageByUser
} from "../controllers/energyUsage.controller.js";
import { verifyAdmin, verifyJWT } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.get("/current",verifyJWT, getUsageByUser);
router.post("/",verifyJWT,verifyAdmin, addEnergyUsage);
// router.get("/", getAllEnergyUsage);
router.get("/:userId", getEnergyUsageByUser);

export default router;
