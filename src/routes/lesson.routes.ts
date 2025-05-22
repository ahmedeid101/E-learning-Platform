import { Router } from 'express';
import * as LessonController from '../controllers/lesson.controller';
import { protect } from '../middlewares/auth.middleware';
import { authorizeRoles } from '../middlewares/role.middleware';

const router = Router();

router.post('/create', protect, authorizeRoles('instructor'), LessonController.createLesson);
router.get('/getAll', LessonController.getAll);
router.get('/byCourse/:courseId', protect, LessonController.getByCourse);
router.get('/byId/:id', protect, LessonController.getById);
router.put('/update/:id', protect, authorizeRoles('instructor'), LessonController.update);
router.delete('/delete/:id', protect, authorizeRoles('instructor'), LessonController.remove);

export default router;