import { Types } from 'mongoose';

export interface ISubmissionAnswer {
  questionId: Types.ObjectId;
  answer: string | boolean;
}

export interface ISubmission {
  student: Types.ObjectId;
  assessment: Types.ObjectId;
  answers: ISubmissionAnswer[];
  score: number;
  status: 'passed' | 'failed';
  submittedAt: Date;
}