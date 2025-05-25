import mongoose from 'mongoose';
import { ISubmission } from '../types/submission.type';

const AnswerSchema = new mongoose.Schema({
  questionId: { type: mongoose.Types.ObjectId, required: true },
  answer: { type: mongoose.Schema.Types.Mixed, required: true },
});

const SubmissionSchema = new mongoose.Schema<ISubmission>({
    student: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    assessment: { type: mongoose.Schema.Types.ObjectId, ref: 'Assessment', required: true },
    answers: [AnswerSchema],
    score: { type: Number, required: true },
    status: { type: String, enum: ['passed', 'failed'] },
    submittedAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

export const Submission = mongoose.model<ISubmission>('Submission', SubmissionSchema);