import mongoose, { Schema } from "mongoose";

const billSchema = new Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",  // Linking the bill to a specific user
            required: true
        },
        bill_date: {
            type: Date,
            default: Date.now  // Bill generation date (default: today)
        },
        due_date: {
            type: Date,
            required: true  // Admin must set a due date
        },
        units: {
            type: Number,
            required: true,  // Energy consumed (fetched from user)
            min: [0, "Units cannot be negative"]
        },
        amount: {
            type: Number,
            required: true,  // This will be calculated based on units
        },
        status: {
            type: String,
            enum: ["pending", "paid", "overdue"], // Possible statuses
            default: "pending"
        }
    },
    { timestamps: true }
);

export const Bill = mongoose.model("Bill", billSchema);
