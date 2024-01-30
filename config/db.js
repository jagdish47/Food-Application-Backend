import mongoose from "mongoose";

export const connection = async () => {
  const uri = process.env.MONGO_URL;
  try {
    await mongoose.connect(uri);
    console.log("Connected to Database 🚀".bgMagenta);
  } catch (error) {
    console.log("Error while Connecting to Database ❌".bgRed);
    console.log(error.message);
  }
};
