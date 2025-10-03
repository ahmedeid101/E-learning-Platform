import express from 'express';
import * as courseController from '../controllers/course.controller';
import { protect } from '../middlewares/auth.middleware';
import { authorizeRoles } from '../middlewares/role.middleware';


const router = express.Router();

router.post('/', protect, authorizeRoles('instructor'), courseController.createCourse);
router.get('/all', protect, courseController.getAll);
router.get('/:id', protect, courseController.getOne); 
router.put('/:id', protect, authorizeRoles('instructor'), courseController.update);
router.delete('/:id', protect, authorizeRoles('admin','instructor'), courseController.remove);

export default router;