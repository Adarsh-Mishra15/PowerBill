import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

// Configure email transporter
const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.ADMIN_EMAIL, // Admin email
        pass: process.env.ADMIN_PASS   // Admin email app password
    }
});

// Send alert email function
export const sendAlertEmail = async (toEmail,title, message) => {
    try {
        
        const mailOptions = {
            from: process.env.ADMIN_EMAIL,
            to: toEmail,
            subject: `⚠️ ${title}!`,
            text: `${message}\n\nRegards,\nAdmin - Energy Monitoring Team`
        };

        await transporter.sendMail(mailOptions);
        console.log("✅ Alert email sent to:", toEmail);
    } catch (error) {
        console.error("❌ Error sending alert email:", error);
    }
};

