import {Router} from "express";
import {
    createComplaint,
    getAllComplaints,
    updateComplaintStatus,
    deleteComplaint
} from "../controllers/complaint.controller.js";
import { verifyAdmin, verifyJWT } from "../middlewares/auth.middleware.js";
//import { authenticate, authorizeAdmin } from "../middlewares/authMiddleware.js"; // Middleware for authentication

const router = Router();

router.route("/all").get(verifyJWT,verifyAdmin,getAllComplaints);
router.route("/").post(verifyJWT,createComplaint);
// router.route("/complaints/:id/update",updateComplaintStatus)
// router.route("/complaints/:id/delete",deleteComplaint)

export default router;