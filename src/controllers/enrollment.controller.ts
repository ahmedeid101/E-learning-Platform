import { Request, Response } from 'express';
import * as EnrollmentService from '../services/enrollment.services';
import { updateCompletionSchema, filterEnrollmentSchema,createEnrollmentSchema, courseEnrollmentFilterSchema } 
        from '../validations/enrollment.validation';
import { AuthRequest } from '../middlewares/auth.middleware';
import { zodValidate } from '../utils/zod';

// Students: Enroll in a course
export const enroll = async (req: AuthRequest, res: Response) => {
    const validated = zodValidate(createEnrollmentSchema, req.body, res);
    if (!validated) return;
    try {
      const enrollment = await EnrollmentService.enrollInCourse(req.user!.id, validated.courseId);
      res.status(201).json(enrollment);
    } catch (err: any) {
      res.status(400).json({ message: err.message });
    }
};


//Students: View own enrollments
export const getMyEnrollments = async (req: AuthRequest, res: Response) => {
    const validated = zodValidate(filterEnrollmentSchema, req.query, res);
    if (!validated) return;

    try {
    const enrollments = await EnrollmentService.getStudentEnrollments(req.user!.id, validated);
    //console.log('Student ID:', req.user!.id);
      res.json(enrollments);
    } catch {
      res.status(500).json({ message: 'Failed to fetch enrollments' });
    }
};

// Instructors/Admins: View enrolled students in a course
export const getEnrolledStudents = async (req: AuthRequest, res: Response) => {
    const validated = zodValidate(courseEnrollmentFilterSchema, req.query, res);
    if (!validated) return;
    try {
      const students = await EnrollmentService.getEnrolledStudentsByCourse(req.params.courseId, validated);
      res.json(students);
    } catch (err) {
      res.status(500).json({ message: 'Failed to fetch enrolled students' });
    }
};

export const updateEnrollmentCompletion  = async(req: AuthRequest, res: Response) => {
  const validated = zodValidate(updateCompletionSchema, req.body, res);
  if(!validated) return;

  try {
    const updated = await EnrollmentService.markEnrollmentComplete(validated.enrollmentId, validated.completed);
    if(!updated){
      res.status(404).json({ message: 'Enrollment not found' });
    }
    res.json({ message: 'Enrollment status updated successfully', updated });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
}