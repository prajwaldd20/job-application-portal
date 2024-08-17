import mongoose from "mongoose";

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('Mongo Db connected successfully');
    } catch (error) {
        console.log("Mongo DB connection error", error);
    }
}
export default connectDB;