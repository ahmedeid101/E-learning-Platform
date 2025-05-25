import { z } from "zod";

// Schema for creating a course
export const createCourseSchema = z.object({
    title: z.string().min(3, 'Title must be at least 3 characters'),
    description: z.string().min(10, 'Description must be at least 10 characters'),
    catigory: z.string().optional(),
    price: z.number().positive('Price must be a positive number'),
    instructor: z.string().min(1, 'Instructor ID is required'),
});

// Schema for updating a course
export const updateCourseSchema = z.object({
    title: z.string().optional(),
    description: z.string().optional(),
    catigory: z.string().optional(),
    price: z.number().optional(),
})

// Schema for course ID param validation
export const paramIdSchema = z.object({
    id: z.string().length(24, 'Invalid course ID')
});