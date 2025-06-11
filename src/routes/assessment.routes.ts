import express from 'express';
import { createAssessmentController, getAllAssessmentsController, getAssessmentsByCourseController, getAssessmentByIdController, updateAssessmentController, deleteAssessmentController } 
from '../controllers/assessment.controller';
import { validate } from '../middlewares/validate.middleware';
import { createAssessmentSchema, updateAssessmentSchema } from '../validations/assessment.validator';
import { authorizeRoles } from '../middlewares/role.middleware';
import { protect } from '../middlewares/auth.middleware';

const router = express.Router();

router.post('/create', protect, authorizeRoles('instructor'), validate(createAssessmentSchema), createAssessmentController);
router.get('/all', protect, authorizeRoles('admin', 'instructor'), getAllAssessmentsController);
router.get('/byCourse/:courseId', getAssessmentsByCourseController);
router.get('/byId/:id', getAssessmentByIdController);
router.put('/update/:id', protect, authorizeRoles('instructor'), validate(updateAssessmentSchema), updateAssessmentController);
router.delete('/delete/:id', protect, authorizeRoles('admin', 'instructor'), deleteAssessmentController);

export default router;