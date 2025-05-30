import mongoose from "mongoose";
import { DB_NAME } from "../constants.js";

const connectDB = async ()=>{
    try {
        console.log(process.env.MONGODB_URI,DB_NAME)
        await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`)
    } catch (error) {
        console.log("ERROR in DB connection : ",error);
        throw error;
    }
}

export {connectDB}