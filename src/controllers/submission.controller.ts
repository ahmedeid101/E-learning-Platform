import {  Response, NextFunction } from 'express';
import * as SubmissionService from '../services/submission.services';
import {AuthRequest} from '../middlewares/auth.middleware';


export const submitAssessment = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const { assessmentId, answers } = req.body;
    const studentId = req.user._id; // Assuming user is authenticated

    const submission = await SubmissionService.createSubmission(studentId, assessmentId, answers);
    res.status(201).json({ success: true, data: submission });
  } catch (err) {
    next(err);
  }
};

export const resubmitSubmissionController = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const { assessmentId } = req.params;
    const studentId = req.user._id;
    const { newAnswers } = req.body;

    const result = await SubmissionService.resubmitSubmission(studentId, assessmentId, newAnswers);
    res.status(201).json(result);
  } catch (err) {
    next(err);
  }
};

export const getAllSubmissionsController = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const submissions = await SubmissionService.getAllSubmissions();
    res.status(200).json({ success: true, data: submissions });
  } catch (error) {
    next(error);
  }
};

export const getStudentSubmissionsController = async ( req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const studentId = req.user._id;
    const submissions = await SubmissionService.getStudentSubmissions(studentId);
    res.json(submissions);
  } catch (err) {
    next(err);
  }
};

export const getSubmissionByIdController = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const submission = await SubmissionService.getSubmissionById(req.params.id);
    if (!submission)  res.status(404).json({ message: 'Submission not found' });
    res.json(submission);
  } catch (err) {
    next(err);
  }
};

export const updateSubmissionController = async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;
    const updatedSubmission = await SubmissionService.updateSubmission(id, req.body);

    if (!updatedSubmission) {
      res.status(404).json({ message: 'Submission not found' });
    }

    res.status(200).json(updatedSubmission);
  } catch (error) {
    res.status(500).json({ message: 'Failed to update submission', error });
  }
};


export const deleteSubmissionController = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    await SubmissionService.deleteSubmission(req.params.id);
    res.json({ message: 'Submission deleted successfully' });
  } catch (err) {
    next(err);
  }
};