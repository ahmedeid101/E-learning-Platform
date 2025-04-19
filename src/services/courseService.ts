import { Course} from "../models/courseModel";
import { ICourse } from '../types/course';


export const createCourse = async(data: any) =>{
    return await Course.create(data);
};

export const getAllCourses = async() =>{
    return await Course.find().populate('instructor', 'name email');
};

export const getCourseById = async(id: string) =>{
    return await Course.findById(id).populate('instructor', 'name email')
};

export const updateCourse = async (courseId: string, userId: string, data: Partial<ICourse>) => {
    const course = await Course.findOne({_id: courseId, instructor: userId});
    if(!course) return null;

    Object.assign(course, data);
    await course.save();
    return course;
};
  
export const deleteCourse = async (courseId: string, instructorId: string) => {
    //This prevents instructors from deleting courses created by others.
    const course =  await Course.findOneAndDelete({_id: courseId, instructor: instructorId});
    if(!course) return null;
    return course;
};