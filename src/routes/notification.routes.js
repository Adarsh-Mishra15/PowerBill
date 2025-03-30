import express from "express";
import { getUnreadNotifications, markNotificationAsRead } from "../controllers/notification.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.patch("/:notificationId/read",verifyJWT, markNotificationAsRead);
router.get("/unread",verifyJWT, getUnreadNotifications);

export default router;
