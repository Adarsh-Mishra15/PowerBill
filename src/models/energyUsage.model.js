import mongoose from "mongoose";

const EnergyUsageSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    username: { type: String, required: true }, // ✅ Storing username for quick reference
    meterReading: { type: Number, default: 0 }, // Energy used (consumed - surplus)
    consumedEnergy: { type: Number, default: 0 }, // kWh used
    surplusEnergy: { type: Number, default: 0 }, // ✅ New Field: Extra energy sent to grid
    billingCycle: { type: String, required: true }, // "March-2025"
    estimatedBill: { type: Number, default: 0 }, // Auto-calculated bill
    recordedAt: { type: Date, default: Date.now }
});

// ✅ Auto-calculate estimated bill before saving
EnergyUsageSchema.pre("save", function (next) {
    const ratePerUnit = 10; // ₹10 per kWh
    const discountRate = 5; // ₹5 credited per surplus kWh
    this.estimatedBill = (this.consumedEnergy * ratePerUnit) - (this.surplusEnergy * discountRate);
    next();
});

export default mongoose.model("EnergyUsage", EnergyUsageSchema);
