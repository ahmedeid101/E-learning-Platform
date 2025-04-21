import { Request, Response } from "express";
import * as courseService  from '../services/courseService';
import { AuthRequest } from '../middleware/auth.middleware';
import { createCourseSchema, updateCourseSchema, paramIdSchema } from "../validations/course.validation"
import { zodValidate } from "../utils/zod";

export const createCourse = async(req: AuthRequest, res: Response): Promise<void> =>{
    const validated = zodValidate(createCourseSchema, req.body, res);
        if(!validated) return;
    try {
        // const parsed = createCourseSchema.safeParse(req.body);
        // if (!parsed.success) {
        //     res.status(400).json({ errors: parsed.error.flatten().fieldErrors });
        // }
        const course = await courseService.createCourse({...validated, instructor: req.user.id});
        res.status(201).json(course)
    } catch (error) {
        res.status(500).json({ message: 'Failed to create course' });
    } 
};

export const getAll = async(_req: Request, res: Response): Promise<void> =>{
    const courses = await courseService.getAllCourses();
    res.status(201).json(courses);
};

export const getOne = async(req: Request, res: Response): Promise<void> =>{
    const course = await courseService.getCourseById(req.params.id)
    if (!course){
        res.status(404).json({ message: 'Course not found' });
        return;
    }
    res.status(200).json(course);
};

export const update = async (req: AuthRequest, res: Response) => {
    try {
        const idCheck = paramIdSchema.safeParse(req.params);
        if (!idCheck.success) {
            res.status(400).json({ errors: idCheck.error.flatten().fieldErrors });
        }

        const parsed = updateCourseSchema.safeParse(req.body);
        if (!parsed.success) {
            res.status(400).json({ errors: parsed.error.flatten().fieldErrors });
            return;
        }

        const course = await courseService.updateCourse(req.params.id, req.user.id, parsed.data);
        if (!course) {
            res.status(404).json({ message: 'Course not found or unauthorized' });
        }
        res.status(200).json(course);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    } 
};
  
export const remove = async (req: AuthRequest, res: Response): Promise<void> => {
    try {
        // only instructor can delete
        if(req.user.role !== 'instructor'){
            res.status(403).json({ message: 'Forbidden: Only instructors can delete courses' });
        }
        const course = await courseService.deleteCourse(req.params.id, req.user.id);
        if (!course) {
            res.status(404).json({ message: 'Course not found or not authorized' });
        }
        res.status(200).json({ message: 'Course deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Failed to delete course' });
    }
};