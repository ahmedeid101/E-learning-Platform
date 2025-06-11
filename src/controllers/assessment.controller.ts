import { NextFunction, Response } from 'express';
import * as AssessmentService from '../services/assessment.services';
import { AuthRequest } from '../middlewares/auth.middleware';

export const createAssessmentController = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const assessment = await AssessmentService.createAssessment(req.body);
    res.status(201).json(assessment);
  } catch (error) {
    next(error);
  }
};

export const getAllAssessmentsController = async (req: AuthRequest, res: Response,next: NextFunction) => {
  try {
    const assessments = await AssessmentService.getAllAssessments();
    res.status(200).json(assessments);
  } catch (error) {
    next(error);
  }
};

export const getAssessmentByIdController = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const assessment = await AssessmentService.getAssessmentById(id);
    if (!assessment)  res.status(404).json({ message: 'Assessment not found' });
    res.json(assessment);
  } catch (error) {
    next(error);
  }
};

export const getAssessmentsByCourseController = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const { courseId } = req.params;
    const assessments = await AssessmentService.getAssessmentsByCourse(courseId);
    res.json(assessments);
  } catch (error) {
    next(error);
  }
};

export const updateAssessmentController  = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const updated  = await AssessmentService.updateAssessment(id, req.body);
    if (!updated)  res.status(404).json({ message: 'Assessment not found' });
    res.json(updated);
  } catch (error) {
    next(error);
  }
};

export const deleteAssessmentController  = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const deleted = await AssessmentService.deleteAssessment(req.params.id);
    if (!deleted)  res.status(404).json({ message: 'Assessment not found' });
    res.status(200).json({ message: 'Assessment deleted successfully' });
  } catch (error) {
    next(error);
  }
};