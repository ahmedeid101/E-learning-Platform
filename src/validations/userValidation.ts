/*
  Zod is a TypeScript-first schema declaration and validation library
  We use it to validate request parameters before hitting the business logic
  To prevent invalid input (e.g., malformed ids) from causing unexpected behavior or errors.
*/

import z from 'zod';

// Schema for creating a user
export const registerSchema = z.object({
    name: z.string().min(1, 'Name is required'),
    email: z.string().email('Invalid email'),
    password: z.string().min(6, 'Password must be at least 6 characters'),
    role: z.enum(['student', 'instructor'])
});

// Schema for login a user
export const loginSchema = z.object({
    email: z.string().email('Invalid email'),
    password: z.string().min(6, 'Password must be at least 6 characters'),
});

// Schema for updating a user
export const updateUserSchema = z.object({
    name: z.string().min(2).optional(),
    email: z.string().email().optional(),
    password: z.string().min(6).optional()
});