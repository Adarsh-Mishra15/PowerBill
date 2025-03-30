import mongoose from "mongoose";

const notificationSchema = new mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: function () {
                return this.type !== "Natural Calamity"; // No userId needed for global announcements
            }
        },
        title: {
            type: String,
            required: function () {
                return this.type === "Natural Calamity"; // Title required for natural calamity notifications
            }
        },
        message: {
            type: String,
            required: true
        },
        type: {
            type: String,
            enum: ["Energy Consumption Alert", "Bill Reminder", "Natural Calamity"],
            default: "Energy Consumption Alert"
        },
        read: {
            type: Boolean,
            default: false // Mark as unread by default
        }
    },
    { timestamps: true }
);

export const Notification = mongoose.model("Notification", notificationSchema);

