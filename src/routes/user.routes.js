import { Router } from "express";
import { 
    registerUser,
    logInUser,
    logOutUser, 
    refreshAccessToken, 
    getCurrentUser, 
} from "../controllers/user.controller.js";
import { upload } from "../middlewares/multer.middleware.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router();

// User registration route
router.route('/register').post(registerUser); 

// User login route
router.route('/login').post(logInUser);

// Secured routes (requiring JWT token)
router.route('/logout').post(verifyJWT, logOutUser);  // Changed GET to POST for logout
router.route('/refresh-token').get(verifyJWT, refreshAccessToken);
router.route('/current-user').get(verifyJWT, getCurrentUser);

export default router;