import { Course} from "../models/Course";
import { ICourse } from '../types/course.type';


export const createCourse = async(data: Partial<ICourse>): Promise<ICourse> =>{
    const existing = await Course.findOne({title: data.title, instructor: data.instructor});
        if(existing) throw new Error('Course with the same title already exists for this instructor.');
    const course = await Course.create(data);
    return course;
};

export const getAllCourses = async(): Promise<ICourse[]> =>{
    return await Course.find().populate('instructor', 'name email');
};

export const getCourseById = async(courseId: string) =>{
    const course =  await Course.findById(courseId).populate('instructor', 'name email');
    console.log(course?.instructor);
    return course;

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