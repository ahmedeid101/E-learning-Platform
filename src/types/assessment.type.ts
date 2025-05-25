import { Types } from 'mongoose';

export interface IQuestion {
  text: string;
  type: 'mcq' | 'boolean';
  options?: string[];
  correctAnswer: string | boolean;
}

export interface IAssessment {
  course: Types.ObjectId;
  title: string;
  totalMarks: number;
  passingScore: number;
  dueDate: Date;
  questions: IQuestion[];
}