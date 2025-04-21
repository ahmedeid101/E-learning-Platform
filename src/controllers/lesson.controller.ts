import { Request, Response } from 'express';
import { Lesson } from '../models/Lesson';
import { createLessonSchema, updateLessonSchema } from '../validations/lesson.validation';
import {AuthRequest} from '../middleware/auth.middleware';
import * as LessonService  from '../services/lesson.service';
import { zodValidate } from '../utils/zod';
import { Course } from './../models/Course';

export const createLesson = async(req: AuthRequest, res: Response) =>{
    const validated = zodValidate(createLessonSchema, req.body, res);
    if(!validated) return;

    try {
        const lesson = await LessonService.createLesson({...validated, createdBy: req.user!.id});
        res.status(201).json(lesson);
    } catch (error) {
        res.status(500).json({ message: 'Lesson creation failed' });
    }
};

export const getByCourse = async (req: Request, res: Response) => {
    try {
        const lesson = await LessonService.getLessonsByCourse(req.params.CourseId);
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
        const updated = await LessonService.updateLesson(req.params.id, validated);
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

