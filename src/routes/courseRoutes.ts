import express from 'express';
import * as courseController from '../controllers/courseController';
import { protect } from '../middleware/authMiddleware';
import { isInstructor } from '../middleware/isInstructor';


const router = express.Router();

router.post('/course', protect, isInstructor, courseController.createCourse);
router.get('/course', courseController.getAll);
router.get('/course/:id', courseController.getOne); 
router.put('/course/:id', protect, isInstructor, courseController.update);
router.delete('/course/:id', protect, isInstructor, courseController.remove);

export default router;