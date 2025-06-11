import mongoose from 'mongoose';
import { IAssessment } from '../types/assessment.type';

const questionSchema = new mongoose.Schema({
    text: String,
    type: { type: String, enum: ['mcq', 'boolean'], required: true },
    options: [String], // For MCQ
    correctAnswer: mongoose.Schema.Types.Mixed  // string or boolean
});

const assessmentSchema = new mongoose.Schema<IAssessment>({
    course: {type: mongoose.Schema.Types.ObjectId, ref: "Course", required: true},
    title: String,
    totalMarks: Number,
    passingScore: Number,
    dueDate: Date,
    questions: [questionSchema]

},
  { timestamps: true }
);

export const Assessment = mongoose.model<IAssessment>('Assessment', assessmentSchema);