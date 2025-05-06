import { Schema, model } from 'mongoose';
import { ICourse } from '../types/course.type';

const courseSchema = new Schema <ICourse>(
    {
        title: {type: String,required: true},
        description: {type: String},
        catigory: {type: String},
        price: {type: Number},
        instructor: {type: Schema.Types.ObjectId, ref: 'Course', required: true},
    },
    {timestamps: true}
);

export const Course = model<ICourse>('Course', courseSchema);