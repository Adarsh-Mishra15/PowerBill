import { Notification } from "../models/notification.model.js";
import { User } from "../models/user.models.js";
import { asyncHandler } from "../utils/asynchandler.js";
import { ApiError } from "../utils/apierror.js";
import {sendAlertEmail} from "../utils/emailService.js"; // Utility function for sending emails
import { Bill } from "../models/bill.models.js";
import { ApiResponse } from "../utils/apiresponse.js";
import mongoose from "mongoose";

// ✅ Send Notification for Natural Calamity (Admin only)
export const sendCalamityAlert = asyncHandler(async (req, res) => {
    const { title, message } = req.body;

    if (!title || !message) {
        throw new ApiError(400, "Title and message are required");
    }

    // Get all users to send notification
    const users = await User.find({}, "email");

    if (users.length === 0) {
        throw new ApiError(404, "No users found to notify");
    }

    // Create a notification for all users (broadcast message)
    const notification = await Notification.create({
        title,
        message,
        type: "Natural Calamity"
    });

    // Send email notification to all users
    const emailPromises = users.map(user =>
        sendAlertEmail(user.email, title, message)
    );

    await Promise.all(emailPromises);

    res.status(201).json({
        success: true,
        message: "Natural Calamity notification sent to all users",
        notification
    });
});

// ✅ Send Payment Due Reminders to Users
export const sendPaymentReminders = asyncHandler(async (req,res) => {
    const today = new Date();
    const dueDateLimit = new Date();
    dueDateLimit.setDate(today.getDate() + 3);
    dueDateLimit.setHours(23, 59, 59, 999); // Ensure the entire day is included

    // Find bills due within the next 3 days
    const dueBills = await Bill.find({
        due_date: { $lte: dueDateLimit }, // Include the full day
        status: "pending"
    }).populate("user", "email username");

    if (dueBills.length === 0) {
        console.log("✅ No due bills found for reminders.");
        return;
    }

    // Process each due bill
    const emailPromises = dueBills.map(async (bill) => {
        const { user, amount, due_date } = bill;

        // ✅ Create notification for the user
        await Notification.create({
            userId: user._id,
            message: `Your electricity bill of ₹${amount} is due on ${new Date(due_date).toDateString()}. Please make the payment to avoid penalties.`,
            type: "Bill Reminder"
        });

        // ✅ Send email reminder
        const title = "Payment Due Reminder!"
        const message = `Dear ${user.username},\n\nYour electricity bill of ₹${amount} is due on ${new Date(due_date).toDateString()}. Please make the payment promptly to avoid penalties.`
        sendAlertEmail(user.email, title, message)
    });

    await Promise.all(emailPromises);
    console.log("📩 Payment reminders sent successfully.");
    return res
       .status(200)
       .json(
         new ApiResponse(200,"Payment remainders are sent")
      )
});


export const markNotificationAsRead = asyncHandler(async (req, res) => {
    const { notificationId } = req.params;

    // Find the notification
    const notification = await Notification.findById(notificationId);
    if (!notification) {
        throw new ApiError(404, "Notification not found");
    }

    // ✅ Update the 'read' status to true
    notification.read = true;
    await notification.save();

    res.status(200).json(new ApiResponse(200, "Notification marked as read", notification));
});

export const getUnreadNotifications = asyncHandler(async (req, res) => {
    const userId = req.user._id;
    
    // Convert userId to ObjectId
    const userObjectId = new mongoose.Types.ObjectId(userId);

    // Fetch unread notifications for the specific user and global notifications
    const notifications = await Notification.find({
        $or: [
            { userId: userObjectId, read: false },  // User-specific unread notifications
            { userId: { $exists: false } },         // Global notifications (sent to everyone)
            { userId: null }                        // Also includes explicitly null userId
        ]
    });

   // console.log(notifications);

    res.status(200).json(new ApiResponse(200, "Unread notifications fetched", notifications));
});
