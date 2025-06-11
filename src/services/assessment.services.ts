import { Assessment } from '../models/Assessment';
import { IAssessment } from '../types/assessment.type';

export const createAssessment = async (data: IAssessment) => {
  const newAssessment = new Assessment(data);
  return await newAssessment.save();
};

export const getAllAssessments = async () => {
  return await Assessment.find().populate('course').lean();
};

export const getAssessmentById = async (id: string) => {
  return await Assessment.findById(id);
};

export const getAssessmentsByCourse = async (courseId: string) => {
  return await Assessment.find({ course: courseId });
};

export const updateAssessment = async (id: string, data: Partial<IAssessment>) => {
  return Assessment.findByIdAndUpdate(id, data, { new: true });
};

export const deleteAssessment = async (id: string) => {
  return Assessment.findByIdAndDelete(id);
};
