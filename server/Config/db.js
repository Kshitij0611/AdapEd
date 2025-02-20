import mongoose from "mongoose";
import dotenv from "dotenv";
const connectDB = async () => {
    dotenv.config();
    console.log(process.env.MONGO_URI)
    try{
        const conn= await mongoose.connect(process.env.MONGO_URI);
        console.log(`MogoDB Connected: ${conn.connection.host}`);
    }catch(error){
        console.error(`Error: ${error.message}`);
        process.exit(1);
    }
}
export default connectDB;