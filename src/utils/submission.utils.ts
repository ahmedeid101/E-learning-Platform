import { Types } from 'mongoose';
import { Submission } from '../models/Submission';
import { Assessment } from '../models/Assessment';
import { IAssessment } from '../types/assessment.type';
import { ISubmissionAnswer } from '../types/submission.type';
type IAssessmentWithId = IAssessment & { _id: Types.ObjectId };


export const validateInitialSubmission = async (
  studentId: string,
  assessmentId: string
): Promise<IAssessment> => {
  const assessment = await Assessment.findById(assessmentId);
  if (!assessment) throw new Error('Assessment not found');

  const existing = await Submission.findOne({
    student: studentId,
    assessment: assessmentId
  });

  if (existing) {
    throw new Error('You have already submitted this assessment');
  }

  if (assessment.dueDate && new Date() > new Date(assessment.dueDate)) {
    throw new Error('Submission closed. Due date has passed');
  }

  return assessment;
};


export const validateResubmission = async (studentId: string, submissionId: string) => {
  const submission = await Submission.findById(submissionId)
  .populate<{ assessment: IAssessment }>('assessment');
  if (!submission) throw new Error('Submission not found');
  if (submission.student.toString() !== studentId) throw new Error('Unauthorized');

const assessment = submission.assessment as IAssessmentWithId;

  if (assessment.dueDate && new Date() > new Date(assessment.dueDate)) {
    throw new Error('Cannot resubmit after the due date');
  }

  const pastSubmissionsCount = await Submission.countDocuments({
    student: studentId,
    assessment: assessment._id
  });

  if (pastSubmissionsCount >= 3) {
    throw new Error('Resubmission limit reached');
  }

  return { assessment, pastSubmissionsCount };
};

export const calculateScore = (
  assessment: IAssessment,
  answers: ISubmissionAnswer[]
): number => {
  return assessment.questions.filter((q: any) =>
    answers.find(a => a.questionId.toString() === q._id.toString())?.answer === q.correctAnswer
  ).length;
};
