import mongoose from "mongoose";

const ComplaintSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    type: { 
        type: String, 
        enum: ["Billing Issue", "Meter Issue", "Power Outage", "Other", "Feedback"] 
    },
    message: String,
    transactionId: { 
        type: mongoose.Schema.Types.Mixed, 
        ref: "Payment", 
        required: function() { return this.type === "Billing Issue"; } 
    },
    status: { 
        type: String, 
        enum: ["Open", "In Progress", "Resolved"], 
        default: function() { return this.type === "Feedback" ? "Resolved" : "Open"; }
    },
    priority: { 
        type: String, 
        enum: ["Low", "Medium", "High"], 
        default: function() { return this.type === "Feedback" ? "Low" : "Medium"; }
    },
    createdAt: { type: Date, default: Date.now }
});

export const Complaint = mongoose.model("Complaint", ComplaintSchema);
