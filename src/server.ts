import dotenv from 'dotenv';
dotenv.config();

import connectDB from './config/db';
import express from 'express';
import cors from 'cors';
//import xss from 'xss-clean';
import rateLimiting from "express-rate-limit";
import helmet from "helmet";
import hpp from 'hpp';

import authRoutes from './routes/auth.routes';
import userRoutes from './routes/user.routes';
import courseRoutes from './routes/course.routes';
import lessonRoutes from './routes/lesson.routes';
import enrollmentRoutes from './routes/enrollment.routes';
import assessmentRoutes from './routes/assessment.routes';
import submissionRoutes from './routes/submission.routes';
import mongoose from 'mongoose';


const app = express();



//Middlewares
app.use(cors());
app.use(express.json()); // For JSON bodies
app.use(express.urlencoded({ extended: true })); // For form data
//app.use(xss()); //prevent XSS(Cross Site Scripting) attacks
app.use(rateLimiting({
    windowMs: 10 * 60 * 1000,
    max: 100
})); //for requst rate limit
app.use(helmet()); //for Header Security
app.use(hpp()); //prevent http param pollution

app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/courses', courseRoutes);
app.use('/api/lessons', lessonRoutes);
app.use('/api/enrollments', enrollmentRoutes);
app.use('/api/assessments', assessmentRoutes);
app.use('/api/submissions', submissionRoutes);


app.get('/', (_req, res) =>{
    res.send('E-Learning API Is Running');
});

const PORT = process.env.PORT || 5000;

// only connect & listen if not in test mode
if (process.env.NODE_ENV !== "test") {
  mongoose.connect(process.env.MONGO_URI!)
    .then(() => {
      app.listen(process.env.PORT || 5000, () => {
        console.log(`Server running on port ${process.env.PORT || 5000}`);
      });
    })
    .catch(err => console.error(err));
}

// connectDB().then(() => {
//   app.listen(PORT, () => {
//     console.log(`Server running on port ${PORT}`);
//   });
// });

export default app;