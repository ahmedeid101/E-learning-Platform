import dotenv from 'dotenv';
dotenv.config();

import experss from 'express';
import cors from 'cors';
import authRoutes from './routes/authRoutes';
import userRoutes from './routes/userRoutes';
import courseRoutes from './routes/courseRoutes';


const app = experss();

app.use(cors());
app.use(experss.json());
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/courses', courseRoutes);

app.get('/', (_req, res) =>{
    res.send('E-Learning API Is Running');
});

export default app;