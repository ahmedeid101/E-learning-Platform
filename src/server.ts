import dotenv from 'dotenv';
dotenv.config();

import connectDB from './config/db';
import experss from 'express';
import cors from 'cors';
import authRoutes from './routes/auth.routes';
import userRoutes from './routes/user.routes';
import courseRoutes from './routes/course.routes';
import lessonRoutes from './routes/lesson.routes';



const app = experss();

app.use(cors());
app.use(experss.json());
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/courses', courseRoutes);
app.use('/api/lessons', lessonRoutes);


app.get('/', (_req, res) =>{
    res.send('E-Learning API Is Running');
});

const PORT = process.env.PORT || 5000;

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
});

export default app;