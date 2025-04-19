import mongoose from 'mongoose';

const courseSchema = new mongoose.Schema({
    title: {type: String, require: true},
    description: String,
    catigory: String,
    instructor: {type: mongoose.Schema.Types.ObjectId, ref: 'User', require: true},
    createdAt: {type: Date, default: Date.now}
});

export const Course = mongoose.model('Course', courseSchema);