import { Request, Response } from 'express';
import { createLessonSchema, updateLessonSchema } from '../validations/lesson.validation';
import {AuthRequest} from '../middlewares/auth.middleware';
import * as LessonService  from '../services/lesson.services';
import { zodValidate } from '../utils/zod';
import { Types } from 'mongoose';
import { ILesson } from '../types/lesson.type';

export const createLesson = async(req: AuthRequest, res: Response) =>{
    const validated = zodValidate(createLessonSchema, req.body, res);
    if(!validated) return;

    try {
        const lesson = await LessonService.createLesson({
            ...validated,
            createdBy: new Types.ObjectId(req.user!.id),
            courseId: new Types.ObjectId(validated.courseId),
        });
        res.status(201).json(lesson);
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};

export const getAll = async(_req: Request, res: Response): Promise<void> =>{
    const lessons = await LessonService.getAllLessons();
    res.status(201).json(lessons);
};


export const getByCourse = async (req: Request, res: Response) => {
    try {
        const lesson = await LessonService.getLessonsByCourse(req.params.courseId);
        if (!lesson) {
            res.status(404).json({ message: 'Lesson not found' });
        }
        res.json(lesson);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching lessons' });
    }
};

export const getById = async (req: Request, res: Response) => {
    try {
        const lesson = await LessonService.getLessonById(req.params.id);
        if (!lesson) {
            res.status(404).json({ message: 'Lesson not found' });
        }
        res.json(lesson);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching lessons' });
    }
};

export const update = async (req: AuthRequest, res: Response) => {
    const validated = zodValidate(updateLessonSchema, req.body, res);
    if (!validated) return;

    try {
        const lessonData: Partial<ILesson> = {...validated,
        //Convert to ObjectId only if values exist
        courseId: validated.courseId ? new Types.ObjectId(validated.courseId) : undefined,
            createdBy: new Types.ObjectId(req.user.id) // use from logged-in user
        };
    
        const updated = await LessonService.updateLesson(req.params.id, lessonData);
        res.json(updated);
    } catch (error) {
        res.status(500).json({ message: 'Lesson update failed' });
    }
}; 

export const remove = async (req: AuthRequest, res: Response) => {
    try {
      await LessonService.deleteLesson(req.params.id);
      res.json({ message: 'Lesson deleted' });
    } catch (err) {
      res.status(500).json({ message: 'Lesson deletion failed' });
    }
};