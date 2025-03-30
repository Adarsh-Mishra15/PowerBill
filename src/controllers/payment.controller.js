import { asyncHandler } from "../utils/asynchandler.js";
import { ApiError } from "../utils/apierror.js";
import Razorpay from "razorpay";
import { Bill } from "../models/bill.models.js";
import { Payment } from "../models/payment.model.js";
import { ApiResponse } from "../utils/apiresponse.js";
import crypto from "crypto";


const razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID, 
    key_secret: process.env.RAZORPAY_KEY_SECRET
});

// ✅ Create Payment Order
export const createPaymentOrder = asyncHandler(async (req, res) => {
    const { billId } = req.body;

    // Fetch the bill
    const bill = await Bill.findById(billId).populate("user", "email username");
    if (!bill) throw new ApiError(404, "Bill not found");

    if (bill.status !== "pending") throw new ApiError(400, "Bill is already paid or overdue");

    // Create an order in Razorpay
    const options = {
        amount: bill.amount * 100, // Convert to paisa (₹1 = 100 paisa)
        currency: "INR",
        receipt: `bill_${bill._id}`
    };

    const order = await razorpay.orders.create(options);

    res.status(200).json({
        success: true,
        orderId: order.id,
        amount: bill.amount,
        currency: "INR",
        userEmail: bill.user.email,
    });
});

// ✅ Verify Payment & Save to DB
export const verifyPayment = asyncHandler(async (req, res) => {
    const { orderId, paymentId, signature, billId } = req.body;

    const generatedSignature = crypto
        .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
        .update(orderId + "|" + paymentId)
        .digest("hex");

    if (generatedSignature !== signature) {
        throw new ApiError(400, "Payment verification failed");
    }
    // Save Payment to DB
    const payment = await Payment.create({
        user: req.user._id, // Assuming user is authenticated
        bill: billId,
        amount: req.body.amount,
        paymentId,
        orderId,
        signature,
        status: "Success"
    });

    // Update Bill Status to Paid
    await Bill.findByIdAndUpdate(billId, { status: "Paid" });

    res.status(200).json(new ApiResponse(200, "Payment verified successfully", payment));
});

// ✅ Get User Payment History
export const getUserPayments = asyncHandler(async (req, res) => {
    const payments = await Payment.find({ user: req.user._id }).populate("bill");

    res.status(200).json(new ApiResponse(200, "User payment history fetched", payments));
});