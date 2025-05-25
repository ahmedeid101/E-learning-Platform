import express from 'express';
import * as courseController from '../controllers/course.controller';
import { protect } from '../middlewares/auth.middleware';
import { authorizeRoles } from '../middlewares/role.middleware';


const router = express.Router();

router.post('/create', protect, authorizeRoles('instructor'), courseController.createCourse);
router.get('/getAll', protect, courseController.getAll);
router.get('/getOne/:id', protect, courseController.getOne); 
router.put('/update/:id', protect, authorizeRoles('instructor'), courseController.update);
router.delete('/delete/:id', protect, authorizeRoles('admin, instructor'), courseController.remove);

export default router;