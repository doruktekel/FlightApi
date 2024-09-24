import mongoose from "mongoose";

// Connecting mongoose database with our backend
// MONGO_URI coming from .env folder
const connectDb = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDb Connected :", conn.connection.host);
  } catch (error) {
    console.log("Connecting database error", error);
    process.exit(1);
  }
};

export default connectDb;
