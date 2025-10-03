import { Types } from 'mongoose';

export const buildEnrollmentFilter = ({
  studentId,
  courseId,
  startDate,
  endDate,
}: {
  studentId?: string;
  courseId?: string;
  startDate?: string;
  endDate?: string;
}) => {
    const filter: any = {};

    if (studentId) filter.student = new Types.ObjectId(studentId);
    if (courseId) filter.course = new Types.ObjectId(courseId);

    if (startDate || endDate) {
        filter.enrolledAt = {};
        if (startDate) filter.enrolledAt.$gte = new Date(startDate);
        if (endDate) filter.enrolledAt.$lte = new Date(endDate);
    }
    return filter;
};