import { Submission } from '../models/Submission';
import { Assessment } from '../models/Assessment';
import { ISubmissionAnswer } from '../types/submission.type';
import { validateInitialSubmission, validateResubmission, calculateScore } from '../utils/submission.utils';
import { Types } from 'mongoose';

export const createSubmission = async (
  studentId: string,
  assessmentId: string,
  answers: ISubmissionAnswer[]
) => {
 const assessment = await validateInitialSubmission(studentId, assessmentId);

  const score = calculateScore(assessment, answers);
  const passed = score >= assessment.passingScore;


  return Submission.create({
    student: studentId,
    assessment: assessmentId,
    answers,
    score,
    status: passed ? 'passed' : 'failed',
    submittedAt: new Date()
  });

};

export const resubmitSubmission = async (studentId: string, assessmentId: string, newAnswers: ISubmissionAnswer[]) => {
    const { assessment, pastSubmissionsCount } = await validateResubmission(studentId, assessmentId);

    const score = calculateScore(assessment, newAnswers);
    const passed = score >= assessment.passingScore;

    return Submission.create({
    student: studentId,
    assessment: assessment._id,
    answers: newAnswers,
    score,
    status: passed ? 'passed' : 'failed',
    submittedAt: new Date()
  });

};

export const getAllSubmissions = async () => {
  return Submission.find()
    .populate('student', 'name email')
    .populate('assessment', 'title course');
};

export const getStudentSubmissions = async (studentId: string) => {
  return Submission.find({ student: studentId })
    .populate('assessment', 'title course')
    .sort({ submittedAt: -1 });
};

export const getSubmissionById = async (id: string) => {
  return Submission.findById(id)
    .populate('student', 'name email')
    .populate('assessment', 'title course');
};

export const updateSubmission = async (
  id: string,
  updatedData: {
    answers?: ISubmissionAnswer[];
    score?: number;
    status?: 'passed' | 'failed';
  }
) => {
  return Submission.findByIdAndUpdate(id, updatedData, { new: true });
};

export const deleteSubmission = async (id: string) => {
  return Submission.findByIdAndDelete(id);
};