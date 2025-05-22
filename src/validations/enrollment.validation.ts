import { z } from 'zod';

export const createEnrollmentSchema = z.object({
  courseId: z.string().min(1, 'Course ID is required'),
});

export const filterEnrollmentSchema = z.object({
  page: z.coerce.number().min(1).optional(),
  limit: z.coerce.number().min(1).optional(),
  startDate: z.string().optional(),
  endDate: z.string().optional(),
});

export const courseEnrollmentFilterSchema = z.object({
  page: z.coerce.number().min(1).optional(),
  limit: z.coerce.number().min(1).optional(),
  startDate: z.string().optional(),
  endDate: z.string().optional(),
});

export const updateCompletionSchema = z.object({
  enrollmentId: z.string().length(24, 'Invalid enrollment ID'),
  completed: z.boolean()
});