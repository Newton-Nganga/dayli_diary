import mongoose from "mongoose";
const mongourl = process.env.MONGO_URI_LOCAL || process.env.MONGO_URI;
const connectMongo = async () =>mongoose.connect(mongourl ); 

export default connectMongo;
