import cron from "node-cron";
import { sendPaymentReminders } from "../notification.controller.js";

// ✅ Schedule job to run **every day at 8 AM**
cron.schedule("0 8 * * *", async () => {
    console.log("⏳ Running daily payment reminder job...");
    await sendPaymentReminders();
});
