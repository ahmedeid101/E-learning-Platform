import mongoose,{ Document } from "mongoose";

export interface IEnrollment extends Document {
    student: mongoose.Types.ObjectId;
    course: mongoose.Types.ObjectId;
    enrolledAt: Date;
    status: 'active' | 'completed';
}