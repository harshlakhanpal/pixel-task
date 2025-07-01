import mongoose from 'mongoose';

export const connectDB = async (uri: string) => {
  try {
    await mongoose.connect(uri);
    console.log('db connected');
  } catch (error) {
    console.error('db connection failed', { error });
    process.exit(1);
  }
};
