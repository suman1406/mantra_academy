import mongoose, { Schema, Document } from "mongoose";

export interface IAdmin extends Document {
  email: string;
  passwordHash: string;
  name?: string;
  role?: string;
}

const AdminSchema = new Schema<IAdmin>({
  email: { type: String, required: true, unique: true },
  passwordHash: { type: String, required: true },
  name: String,
  role: { type: String, default: "admin" },
}, { timestamps: true });

export const Admin = mongoose.models.Admin || mongoose.model<IAdmin>("Admin", AdminSchema);
