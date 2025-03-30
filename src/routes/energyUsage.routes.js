import express from "express";
import {
    addEnergyUsage,
    getEnergyUsageByUser
} from "../controllers/energyUsage.controller.js";
import { verifyAdmin, verifyJWT } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.post("/",verifyJWT,verifyAdmin, addEnergyUsage);
// router.get("/", getAllEnergyUsage);
// router.get("/:id", getEnergyUsageById);
// router.delete("/:id", deleteEnergyUsage);

export default router;
