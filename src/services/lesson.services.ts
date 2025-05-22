import { Types } from 'mongoose';
import { Lesson } from '../models/Lesson';
import { ILesson } from '../types/lesson.type';

export const createLesson = async(data: Partial<ILesson>) =>{
     const existing = await Lesson.findOne({title: data.title, courseId: data.courseId});
        if(existing) throw new Error('Lesson with the same title already exists for this Course.');
    const lesson =  await Lesson.create(data);
    return lesson;
};

export const getAllLessons = async(): Promise<ILesson[]> =>{
    return await Lesson.find().populate('createdBy', 'name email');
};

export const getLessonById = async(lessonId: string) =>{
    return await Lesson.findById(lessonId);
};

export const getLessonsByCourse = async(courseId: string) =>{
    return await Lesson.find({courseId: new Types.ObjectId(courseId)}).populate('courseId');
};

export const updateLesson = async(lessonIs: string, data: Partial<ILesson>) =>{
    return await Lesson.findByIdAndUpdate(lessonIs, data, {new: true});
};

export const deleteLesson = async(lessonId: string) =>{
    return await Lesson.findByIdAndDelete(lessonId);
};