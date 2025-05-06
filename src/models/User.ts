import { model, Schema } from 'mongoose';
import { IUser } from '../types/user.type';

const userSchema = new Schema<IUser>({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['student', 'instructor', 'admin'], default: 'student' }
}, { timestamps: true });

export const User =  model<IUser>('User', userSchema);
