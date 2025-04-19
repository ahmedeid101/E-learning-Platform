import { z } from "zod";

// Schema for creating a course
export const createCourseSchema = z.object({
    title: z.string().min(3, 'Title must be at least 3 characters'),
    description: z.string().min(10, 'Description must be at least 10 characters'),
    price: z.number().positive('Price must be a positive number'),
});

// Schema for updating a course
export const updateCourseSchema = z.object({
    title: z.string().min(3).optional(),
    description: z.string().min(10).optional(),
    price: z.number().positive().optional(),
});

// Schema for course ID param validation
export const paramIdSchema = z.object({
    id: z.string().length(24, 'Invalid course ID')
});