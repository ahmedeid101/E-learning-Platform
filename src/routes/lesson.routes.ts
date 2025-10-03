import { Router } from 'express';
import * as LessonController from '../controllers/lesson.controller';
import { protect } from '../middlewares/auth.middleware';
import { authorizeRoles } from '../middlewares/role.middleware';

const router = Router();

router.post('/', protect, authorizeRoles('instructor'), LessonController.createLesson);
router.get('/all', LessonController.getAll);
router.get('/byCourse/:courseId', protect, LessonController.getByCourse);
router.get('/byId/:id', protect, LessonController.getById);
router.put('/:id', protect, authorizeRoles('instructor'), LessonController.update);
router.delete('/:id', protect, authorizeRoles('instructor', 'admin'), LessonController.remove);

export default router;