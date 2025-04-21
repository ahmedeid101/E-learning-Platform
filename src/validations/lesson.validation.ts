import {z} from 'zod';

export const createLessonSchema = z.object({
    title: z.string().min(1, 'Title is required'),
    description: z.string().optional(),
    videoUrl: z.string().url('Invalid video URL'),
    courseId: z.string().min(1, 'Course ID is required'),
    createdBy: z.string().min(1, 'Instructor ID is required')
});

export const updateLessonSchema = createLessonSchema.partial();