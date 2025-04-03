import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import "./controllers/cronjobs/cronJobs.js"; // Import the scheduled job

const app = express();

console.log(process.env.CORS_ORIGIN)
app.use(cors({
    origin: process.env.CORS_ORIGIN, // Allow specific domains
    credentials: true // Allow cookies to be sent
}));
app.use(cookieParser()); // Correctly call cookieParser middleware

app.use(express.json({ limit: "16kb" })); // Limit JSON body size to 16KB
app.use(express.urlencoded({ extended: true, limit: "16kb" })); // Limit URL-encoded data size to 16KB

app.use(express.static("public")); // Serve static assets from the "public" folder


// Routes declaration

//healthCheck route Declaration
//import healthCheckRoutes from "./routes/healthcheck.routes.js"
//app.use("/api/v1/healthcheck", healthCheckRoutes);

// user routes declaration
import userRoutes from "./routes/user.routes.js"
app.use("/api/v1/users", userRoutes);
import complaintRoutes from "./routes/complaint.routes.js"
app.use("/api/v1/complaints",complaintRoutes)

import energyUsageRoutes from "./routes/energyUsage.routes.js"
app.use("/api/v1/usage",energyUsageRoutes);

import billRoutes from "./routes/bill.routes.js"
app.use("/api/v1/bill",billRoutes)

import calamityRoutes from "./routes/calamityAlert.routes.js"
app.use("/api/v1",calamityRoutes);

import notificationRoutes from "./routes/notification.routes.js"
app.use("/api/v1/notification",notificationRoutes)

import paymentRoutes from "./routes/payment.routes.js"
app.use("/api/v1/payment",paymentRoutes)

export default app;
