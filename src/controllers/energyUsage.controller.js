import EnergyUsage from "../models/energyUsage.model.js";
import { User } from "../models/user.models.js";
import { Notification } from "../models/notification.model.js"; 
import { sendAlertEmail } from "../utils/emailService.js"; 
import mongoose from "mongoose"
import { asyncHandler } from "../utils/asynchandler.js";
import { ApiError } from "../utils/apierror.js";
import { ApiResponse } from "../utils/apiresponse.js";

const ENERGY_THRESHOLD = 500; // Threshold for alerting users
const RATE_PER_UNIT = 10; // ₹10 per kWh
const DISCOUNT_RATE = 5; // ₹5 credited per surplus kWh

// ✅ Add Energy Consumption for a User (Now includes surplus energy tracking)
export const addEnergyUsage = async (req, res) => {
    try {
        const { userId, consumedEnergy, surplusEnergy } = req.body;
        //console.log(userId,consumedEnergy,surplusEnergy)
        //billing cycle
        const getBillingCycle = () => {
            const today = new Date();
            const month = today.toLocaleString("default", { month: "long" }); // e.g., "March"
            const year = today.getFullYear(); // e.g., "2025"
            return `${month}-${year}`;
        };
        
        const billingCycle=getBillingCycle();  // Example Output: "March-2025"
        

        // Find user
        let user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        // Check if usage record already exists for this user & billing cycle
        let usageRecord = await EnergyUsage.findOne({ userId, billingCycle });

        if (usageRecord) {
            // ✅ Update existing record
            usageRecord.consumedEnergy += consumedEnergy;
            usageRecord.surplusEnergy += surplusEnergy;
            const meterReading = Math.max(0, consumedEnergy - surplusEnergy); // Ensure minimum 0

            usageRecord.meterReading += meterReading; // Adjust meter reading
        } else {
            // ✅ Create new record if none exists
            usageRecord = new EnergyUsage({
                userId,
                username: user.username,
                consumedEnergy,
                surplusEnergy,
                meterReading: consumedEnergy - surplusEnergy,
                billingCycle
            });
        }

        // ✅ Auto-calculate estimated bill (Consumption - Surplus credits)
        usageRecord.estimatedBill = (usageRecord.consumedEnergy * RATE_PER_UNIT) - (usageRecord.surplusEnergy * DISCOUNT_RATE);
        
        await usageRecord.save(); // Save changes

        // ✅ Alert user if high energy usage
        if (usageRecord.consumedEnergy >= ENERGY_THRESHOLD) {
            const alertMessage = `Your energy consumption has reached ${usageRecord.consumedEnergy} units. Please take necessary steps to reduce usage.`;

            const meterReadingDate = new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" });
            const title = "High Energy Consumption Alert!";
            const message = `Dear ${user.username},\n\nYour energy consumption has reached ${usageRecord.consumedEnergy} units as of ${meterReadingDate}. Please take necessary steps to reduce usage.`;

            await sendAlertEmail(user.email, title, message);

            await Notification.create({
                userId,
                message: alertMessage,
                type: "Energy Consumption Alert"
            });
        }

        return res.status(200).json({
            message: "Energy usage recorded successfully",
            data: usageRecord
        });

    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// ✅ Get Energy Usage by User (Now includes surplus energy details)

export const getEnergyUsageByUser = async (req, res) => {
    try {
        //console.log("Request params:", req.params);

        const { userId } = req.params; // Extract userId correctly

        // Validate userId format
        if (!mongoose.Types.ObjectId.isValid(userId)) {
            return res.status(400).json({ error: "Invalid user ID format" });
        }

        // Find energy usage records by userId
        const records = await EnergyUsage.find({ userId });

        if (records.length === 0) {
            return res.status(404).json({ message: "No energy usage records found for this user." });
        }

       // console.log("Energy usage records:", records);
        res.status(200).json({ data: records });
    } catch (error) {
        console.error("Error fetching energy usage:", error);
        res.status(500).json({ error: error.message });
    }
};

export const getUsageByUser = asyncHandler(async (req, res) => {
    try {
        // Ensure user is authenticated
        if (!req.user || !req.user._id) {
            throw new ApiError(401, "Unauthorized: No user data found.");
        }

        const userId = req.user._id; // Extract user ID from authenticated user

        // Validate userId format
        if (!mongoose.Types.ObjectId.isValid(userId)) {
            throw new ApiError(400, "Invalid user ID format.");
        }

        // Find energy usage records for the user
        const records = await EnergyUsage.find({ userId }).select("-_id -__v"); // Excluding unnecessary fields

        if (!records.length) {
            throw new ApiError(404, "No energy usage records found for this user.");
        }

        res.status(200).json(new ApiResponse(200, records, "Energy usage fetched successfully"));
    } catch (error) {
        throw new ApiError(500, error.message || "Error fetching energy usage.");
    }
});
