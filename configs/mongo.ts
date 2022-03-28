import mongoose from 'mongoose';

export default async function connectToMoongo() {
  await mongoose.connect(process.env.DB_URL!);
}