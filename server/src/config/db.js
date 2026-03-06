import mongoose from "mongoose";

const connectionMongoDB = async () => {
  try {
    if (!process.env.MONGO_DB_CONNECTION_URL) {
      throw new Error("MongoDB URL not found");
    }

    const conn = await mongoose.connect(
      process.env.MONGO_DB_CONNECTION_URL
    );

    console.log(
      `🌿  MongoDB Atlas Connected: ${conn.connection.host}`
    );

  } catch (error) {
    console.error("❌ MongoDB Connection Failed:", error.message);
    process.exit(1);
  }
};

export default connectionMongoDB;