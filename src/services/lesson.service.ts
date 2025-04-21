import { Lesson } from '../models/Lesson';
import { ILesson } from '../types/lesson.types';
import { Types } from 'mongoose';

export const createLesson = async(data: Partial<ILesson>) =>{
    const lesson =  await Lesson.create(data);
    return lesson;
};

export const getLessonById = async(lessonId: string) =>{
    return await Lesson.findById(lessonId);
};

export const getLessonsByCourse = async(courseId: string) =>{
    return await Lesson.find({courseId: courseId}).populate('courseId');
};

export const updateLesson = async(lessonIs: string, data: Partial<ILesson>) =>{
    return await Lesson.findByIdAndUpdate(lessonIs, data, {new: true});
};

export const deleteLesson = async(lessonId: string) =>{
    return await Lesson.findByIdAndDelete(lessonId);
};