import { Submission } from '../models/Submission';
import { Assessment } from '../models/Assessment';
import { ISubmissionAnswer } from '../types/submission.type';
import { validateInitialSubmission, validateResubmission, calculateScore } from '../utils/submission.util';
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

export const resubmitSubmission = async (
  studentId: string,
  submissionId: string,
  newAnswers: ISubmissionAnswer[]
) => {
  const { assessment, pastSubmissionsCount } = await validateResubmission(
    studentId,
    submissionId
  );

  const score = calculateScore(assessment, newAnswers);
  const passed = score >= assessment.passingScore;

  // Create a new submission attempt (instead of overwriting)
  return Submission.create({
    student: new Types.ObjectId(studentId),
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
  submissionId: string,
  studentId: string,
  newAnswers: ISubmissionAnswer[]
) => {
  // 1. Find the submission
  const submission = await Submission.findById(submissionId).populate("assessment");
  if (!submission) throw new Error("Submission not found");

  // 2. Ensure ownership
  if (submission.student.toString() !== studentId.toString()) {
    throw new Error("Unauthorized");
  }

  const assessment: any = submission.assessment;
  //if (!assessment) throw new Error("Assessment not found");

  // 3. Check deadline
  if (assessment.dueDate && new Date() > new Date(assessment.dueDate)) {
    throw new Error("Cannot update after due date");
  }

  // // Check final status
  // if (submission.status === "passed") {
  //   throw new Error("Cannot update a passed submission");
  // }

  // Recalculate score
  const newScore = calculateScore(assessment, newAnswers);
  const passed = newScore >= assessment.passingScore;
  const totalMarks = assessment.questions.length;

  submission.answers = newAnswers;
  submission.score = newScore;
  submission.status = passed ? "passed" : "failed";
  submission.submittedAt = new Date();

  await submission.save();
  return {
    ...submission.toObject(),
    totalMarks: `${newScore}/${totalMarks}`,
  }
};


// export const updateSubmission = async (
//   id: string,
//   updatedData: {
//     answers?: ISubmissionAnswer[];
//     score?: number;
//     status?: 'passed' | 'failed';
//   }
// ) => {
//   return Submission.findByIdAndUpdate(id, updatedData, { new: true });
// };

export const deleteSubmission = async (id: string) => {
  return Submission.findByIdAndDelete(id);
};