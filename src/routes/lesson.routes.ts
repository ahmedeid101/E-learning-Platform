import { Router } from 'express';
import * as LessonController from '../controllers/lesson.controller';
import { protect } from '../middleware/auth.middleware';
import { authorizeRoles } from '../middleware/role.middleware';

const router = Router();

router.post('/', protect, authorizeRoles('instructor'), LessonController.createLesson);
router.get('/course/:courseId', protect, LessonController.getByCourse);
router.get('/course/:lessonId', protect, LessonController.getById);
router.put('/:id', protect, authorizeRoles('instructor'), LessonController.update);
router.delete('/:id', protect, authorizeRoles('instructor'), LessonController.remove);

export default router;