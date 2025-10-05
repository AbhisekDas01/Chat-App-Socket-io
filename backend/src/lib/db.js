import mongoose from "mongoose";
import { MONGODB_URI } from "../configs/env.config.js";

export const connectDb = async () => {
    try {

        await mongoose.connect(MONGODB_URI + "/chat-app");
        
        console.log("Database connected successfully!!");

        // Listen for disconnection events
        mongoose.connection.on('disconnected', () => {
            console.log("Database disconnected.");
        });

        // Listen for errors after the initial connection
        mongoose.connection.on('error', (err) => {
            console.error("MongoDB runtime error:", err);
        });

    } catch (error) {
        console.error("DB connection error:", error);
        process.exit(1);
    }
};