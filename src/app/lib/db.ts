import dotenv from 'dotenv'
dotenv.config();

import mongoose from 'mongoose'

export const connect = async () => {
    try{
        await mongoose.connect(process.env.MONGO_URI!);
        console.log('Connected to MongoDB');
    }catch(err){
        console.error('Error connecting to MongoDB: ', err);
    }
}