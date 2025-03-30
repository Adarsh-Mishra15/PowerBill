import jwt from "jsonwebtoken"
import { ApiError } from "../utils/apierror.js"
import {asyncHandler} from "../utils/asynchandler.js"
import { User } from "../models/user.models.js"

const verifyJWT = asyncHandler(async (req, res, next) => {

    const token = req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer ", "");
    if (!token) {
        throw new ApiError(401, "Unauthorized access: No token received");
    }

    try {
        const decoded_token = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
        const user = await User.findById(decoded_token._id).select("-password -refreshToken");

        if (!user) {
            throw new ApiError(401, "Invalid access token");
        }

        req.user = user;
        next();
    } catch (error) {
        throw new ApiError(401, "Invalid or expired token");
    }
});


const verifyAdmin = (req, res, next) => {
    if (req.user.role !== "admin") {
        throw new ApiError(403, "Access denied! Admins only");
    }
    next(); // Proceed to the next middleware or route handler
};

export { verifyAdmin };


export {verifyJWT}