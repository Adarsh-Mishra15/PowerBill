import EnergyUsage from "../models/energyUsage.model.js";
import { User } from "../models/user.models.js";
import { Notification } from "../models/notification.model.js"; 
import { sendAlertEmail } from "../utils/emailService.js"; 

const ENERGY_THRESHOLD = 500; // Threshold for alerting users
const RATE_PER_UNIT = 10; // ₹10 per kWh
const DISCOUNT_RATE = 5; // ₹5 credited per surplus kWh

// ✅ Add Energy Consumption for a User (Now includes surplus energy tracking)
export const addEnergyUsage = async (req, res) => {
    try {
        const { userId, consumedEnergy, surplusEnergy } = req.body;

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
            usageRecord.meterReading += consumedEnergy - surplusEnergy; // Adjust meter reading
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
        const records = await EnergyUsage.find({ userId: req.params.userId });

        res.status(200).json(records);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
