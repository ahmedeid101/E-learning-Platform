import { Enrollment } from '../models/Enrollment';
import { Types } from 'mongoose';
import { isValidObjectId } from '../utils/validateObjectId.util';
import { buildEnrollmentFilter } from '../utils/enrollmentQueryBuilder.util';
import { applyPagination } from '../utils/pagination.util';

export const enrollInCourse = async (studentId: string, courseId: string) => {
  const existing = await Enrollment.findOne({ student: studentId, course: courseId });
  if (existing) throw new Error('You are already enrolled in this course.');
  
  return await Enrollment.create({
    student: new Types.ObjectId(studentId),
    course: new Types.ObjectId(courseId),
  });
};

export const getEnrollmentById = async(enrollmentId: string) =>{
    return await Enrollment.findById(enrollmentId);
};

export const getStudentEnrollments = async (
  studentId: string,
  options: { page?: number; limit?: number; startDate?: string; endDate?: string }) => {

  const { page = 1, limit = 10, startDate, endDate } = options;
  const filter = buildEnrollmentFilter({studentId, startDate,  endDate});

  const enrollments = await applyPagination(Enrollment.find(filter)
    .select('course status  enrolledAt')
    .populate('course', 'title description'), // fetch course info
    page,
    limit
  );
  return enrollments;
};

export const getAllEnrollments = async (filters: {
  page?: number;
  limit?: number;
  startDate?: string;
  endDate?: string;
  courseId?: string;
  studentId?: string;
}) => {

  const { page = 1, limit = 10, startDate, endDate, studentId, courseId } = filters;
  const query = buildEnrollmentFilter({studentId, courseId, startDate, endDate});

  const enrollments = await applyPagination(Enrollment.find(query)
      .populate('student', 'name email') // fetch student info
      .populate('course', 'title') // fetch course info
      .sort({ enrolledAt: -1 }),
      page,
      limit
    );
      return enrollments;
};

export const getEnrolledStudentsByCourse = async (
    courseId: string,
    options: { page?: number; limit?: number; startDate?: string; endDate?: string }) => {
        
  const { page = 1, limit = 10, startDate, endDate } = options;
  const filter = buildEnrollmentFilter({courseId, startDate,  endDate});

  const enrollments = await applyPagination(Enrollment.find(filter)
    .select('student completed enrolledAt')
    .populate('student', 'name email'), // fetch student info
    page,
    limit
    );
    return enrollments;
};

export const markEnrollmentComplete = async(enrollmetId: string, completed: boolean)=>{
   const status = completed ? 'completed' : 'active';
   if (!isValidObjectId(enrollmetId)) throw new Error('Invalid enrollment ID');
    return await Enrollment.findByIdAndUpdate(
        enrollmetId,
        {status},
        {new: true}
    );
};

export const deleteEnrollment = async (id: string) => {
  if (!isValidObjectId(id)) throw new Error('Invalid enrollment ID');
  return await Enrollment.findByIdAndDelete(id);
};

export const getEnrollmentStates = async() =>{
  const stats = await Enrollment.aggregate([
    {
      $group: {
        _id: '$status',
        count: {$sum: 1}
      }
    },

    {
      $project: {
        status: '$_id',
        count: 1,
        _id: 0
      }
    }
  ]);

  //Converts the array into an object for easier use in the frontend
  const formatted: Record<string, number> = {};
  stats.forEach(stat =>{
    formatted[stat.status] = stat.count
  });
  return formatted;
}