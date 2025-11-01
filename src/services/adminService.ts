import connectToDatabase from "../lib/mongodb";
import { Admin } from "../models/admin";
import bcrypt from "bcryptjs";

export async function findAdminByEmail(email: string) {
  await connectToDatabase();
  return Admin.findOne({ email }).lean();
}

export async function createAdmin(email: string, password: string, name?: string) {
  await connectToDatabase();
  const hash = await bcrypt.hash(password, 10);
  return Admin.updateOne({ email }, { $set: { email, passwordHash: hash, name } }, { upsert: true });
}

export async function verifyAdmin(email: string, password: string) {
  await connectToDatabase();
  const admin = await Admin.findOne({ email }).lean();
  if (!admin) return false;
  const match = await bcrypt.compare(password, (admin as any).passwordHash);
  return match ? admin : false;
}
