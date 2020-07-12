import mongoose from "mongoose";

export const connect = async () => {
  try {
    mongoose.set('debug', true);
    await mongoose.connect(process.env.MONGODB_URI || "", { useNewUrlParser: true, useUnifiedTopology: true });
    console.info('Database Connected');
  } catch (error) {
    console.error(error);
    throw new Error(error);
  }
}
