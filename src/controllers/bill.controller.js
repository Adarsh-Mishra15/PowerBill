import { Bill } from "../models/bill.models.js";
import { User } from "../models/user.models.js";
import EnergyUsage from "../models/energyUsage.model.js";
import { asyncHandler } from "../utils/asynchandler.js";
import { ApiError } from "../utils/apierror.js";
const generateBill = asyncHandler(async (req, res) => {
    const { userId } = req.body;
    //Due date calculation
    const today = new Date();
    const due_date = new Date(today.setDate(today.getDate() + 10)); // 10 days from today

    // Check if user exists
    const user = await User.findById(userId);
    if (!user) {
        throw new ApiError(404, "User not found");
    }

    // Fetch latest energy usage record for the user
    const latestUsage = await EnergyUsage.findOne({ userId: userId }).sort({ recordedAt: -1 });
    if (!latestUsage || latestUsage.consumedEnergy <= 0) {
        throw new ApiError(400, "No valid energy consumption record found");
    }

    // Define per-unit cost
    const perUnitCost = 5; // Example rate: ₹5 per unit
    const amount = latestUsage.consumedEnergy * perUnitCost;

    // Create and save the bill
    const bill = await Bill.create({
        user: userId,
        due_date,
        units: latestUsage.consumedEnergy,
        amount
    });

    res.status(201).json({
        success: true,
        message: "Bill generated successfully",
        bill
    });
});

export { generateBill };
