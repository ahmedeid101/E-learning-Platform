import { Document, Types } from 'mongoose';

export interface ILesson extends Document{
    title: string;
    description?: string;
    videoURL: string;
    courseId: Types.ObjectId;   // Reference to Course
    createdBy: Types.ObjectId;  // Reference to User
}