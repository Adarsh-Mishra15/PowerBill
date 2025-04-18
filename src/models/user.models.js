import mongoose, {Schema} from "mongoose";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import { ApiError } from "../utils/apierror.js";

const userSchema = new Schema(
    {
        username:{type:String,
            required:true,
            lowercase:true,
            trim:true,
            index:true}, // Username saved in database in lowercase
        fullName:{
            type:String,
            trim:true,
            index:true
        },
        password:{
            type:String,
            required:true,
            required:[true,"Password is required"]
        },
        email:{
            type:String,
            required:true,
            unique:true,
            lowercase:true
        },
        role: {
            type: String,
            enum: ["user", "admin"],  // Restrict roles
            default: "user"  // Default role is "user"
        },
        refreshToken:{
            type:String
        }
    },
    {
        timestamps:true
    }
)

userSchema.pre("save",async function(next){
    if(!this.isModified("password")) return next()
    this.password = await bcrypt.hash(this.password,10)
    
    next()
})

userSchema.methods.isPasswordCorrect = async function (plainPassword) {
    if (!plainPassword) {
        throw new Error("Password is required for comparison");
    }
    return bcrypt.compare(plainPassword, this.password); // `this.password` should be the hashed password stored in the database
};

userSchema.methods.generateAccessToken = function(){
    try {
        const token = jwt.sign({
                _id: this._id,
                email: this.email,
                username: this.username,
                fullName: this.fullName
            },
                process.env.ACCESS_TOKEN_SECRET,
                {
                    expiresIn:"1d"
                }
            )
    
        return token
    } catch (error) {
        throw new ApiError(400,"Unable to generate access Token")
    }
}

userSchema.methods.generateResfreshToken = function(){
    try {
        const refreshToken = jwt.sign(
            {_id:this._id},
            process.env.REFRESH_TOKEN_SECRET,
            {expiresIn:"10d"})

            
        return refreshToken
    } catch (error) {
        throw new ApiError(400,"Error in generating refresh token")
    }
}

export const User = mongoose.model("User",userSchema);