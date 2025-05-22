import express from 'express';
import * as courseController from '../controllers/course.controller';
import { protect } from '../middlewares/auth.middleware';
import { isInstructor } from '../middlewares/isInstructor.middleware';


const router = express.Router();

router.post('/create', protect, isInstructor, courseController.createCourse);
router.get('/getAll', courseController.getAll);
router.get('/getOne/:id', courseController.getOne); 
router.put('/update/:id', protect, isInstructor, courseController.update);
router.delete('/delete/:id', protect, isInstructor, courseController.remove);

export default router;