import mongoose, { Schema } from 'mongoose';
import { IEnrollment } from '../types/enrollment.type';

const EnrollmentSchema = new Schema<IEnrollment>({
    student: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    course: { type: Schema.Types.ObjectId, ref: 'Course', required: true },
    enrolledAt: { type: Date, default: Date.now },
    status: { type: String, enum: ['active', 'completed'], default: 'active' },
});

EnrollmentSchema.index({ student: 1, course: 1 }, { unique: true }); // prevent duplicates

export const Enrollment = mongoose.model<IEnrollment>('Enrollment', EnrollmentSchema);