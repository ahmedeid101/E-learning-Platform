import { Enrollment } from '../models/Enrollment';
import { Types } from 'mongoose';

export const enrollInCourse = async (studentId: string, courseId: string) => {
  const existing = await Enrollment.findOne({ student: studentId, course: courseId });
  if (existing) throw new Error('You are already enrolled in this course.');
  
  return await Enrollment.create({
    student: new Types.ObjectId(studentId),
    course: new Types.ObjectId(courseId),
  });
};


export const getStudentEnrollments = async (
  studentId: string,
  options: { page?: number; limit?: number; startDate?: string; endDate?: string }) => {

  const { page = 1, limit = 10, startDate, endDate } = options;
  const filter: any = { student: new Types.ObjectId(studentId) };

  if (startDate || endDate) {
    filter.enrolledAt = {};
    if (startDate) filter.enrolledAt.$gte = new Date(startDate);
    if (endDate) filter.enrolledAt.$lte = new Date(endDate);
  }

  const enrollments = await Enrollment.find(filter)
    .select('course status  enrolledAt')
    .populate('course', 'title description') // fetch course info
    .skip((page - 1) * limit)
    .limit(limit);

  return enrollments;
};

export const getEnrolledStudentsByCourse = async (
    courseId: string,
    options: { page?: number; limit?: number; startDate?: string; endDate?: string }) => {
        
  const { page = 1, limit = 10, startDate, endDate } = options;
  const filter: any = { course: new Types.ObjectId(courseId) };

  if (startDate || endDate) {
    filter.enrolledAt = {};
    if (startDate) filter.enrolledAt.$gte = new Date(startDate);
    if (endDate) filter.enrolledAt.$lte = new Date(endDate);
  }

  const enrollments = await Enrollment.find(filter)
    .select('student completed enrolledAt')
    .populate('student', 'name email') // fetch student info
    .skip((page - 1) * limit)
    .limit(limit);
    return enrollments;
};

export const markEnrollmentComplete = async(enrollmetId: string, completed: boolean)=>{
    return await Enrollment.findByIdAndUpdate(
        enrollmetId,
        {completed},
        {new: true}
    );
};