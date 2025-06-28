
import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

const DB_URL = process.env.DB_URL;

export const connectDB = async () => {
    try {
        await mongoose.connect(DB_URL);
        console.log('MongoDB connected successfully');
        
    } catch (error) {
        console.error('Error connecting to MongoDB:', error.message);
        process.exit(1); // exit with an error
    }
}