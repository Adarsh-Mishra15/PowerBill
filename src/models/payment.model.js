import mongoose from "mongoose";

const PaymentSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    bill: { type: mongoose.Schema.Types.ObjectId, ref: "Bill", required: true },
    amount: { type: Number, required: true },
    paymentId: { type: String, required: true }, // Razorpay Payment ID
    orderId: { type: String, required: true }, // Razorpay Order ID
    signature: { type: String, required: true }, // Payment Signature
    status: { type: String, enum: ["Success", "Failed", "Pending"], default: "Pending" },
    createdAt: { type: Date, default: Date.now }
});

export const Payment = mongoose.model("Payment", PaymentSchema);
