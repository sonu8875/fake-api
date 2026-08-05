import mongoose from "mongoose";

async function dbConnection() {
  try {
    const URL = process.env.MONGO_DB_URL;

    const db = await mongoose.connect(URL);

    return db;
  } catch (error) {
    console.log(" Database Connection Error:", error.message);
    process.exit(1);
  }
}

export default dbConnection;
