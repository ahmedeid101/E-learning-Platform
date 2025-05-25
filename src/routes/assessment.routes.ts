import express from 'express';
import { createAssessmentController, getAssessmentsByCourseController, getAssessmentByIdController, updateAssessmentController, deleteAssessmentController } 
from '../controllers/assessment.controller';
import { validate } from '../middlewares/validate.middleware';
import { createAssessmentSchema, updateAssessmentSchema } from '../validations/assessment.validator';
import { authorizeRoles } from '../middlewares/role.middleware';
import { protect } from '../middlewares/auth.middleware';

const router = express.Router();

router.post('/create', protect, authorizeRoles('admin, instructor'), validate(createAssessmentSchema), createAssessmentController);
router.get('/course/:courseId', getAssessmentsByCourseController);
router.get('/:id', getAssessmentByIdController);
router.put('/:id', protect, authorizeRoles('admin, instructor'), validate(updateAssessmentSchema), updateAssessmentController);
router.delete('/:id', protect, authorizeRoles('admin, instructor'), deleteAssessmentController);

export default router;