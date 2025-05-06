import { Schema, model } from 'mongoose';
import { ILesson } from '../types/lesson.type';


const lessonSchema = new Schema<ILesson>(
    {
      title: { type: String, required: true },
      description: { type: String },
      videoURL: { type: String, required: true },
      courseId: { type: Schema.Types.ObjectId, ref: 'Course', required: true },
      createdBy: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    },
    { timestamps: true }
  );

export const Lesson = model<ILesson>('Lesson', lessonSchema);