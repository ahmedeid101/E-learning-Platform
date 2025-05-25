import express from 'express';
import {submitAssessment, resubmitSubmissionController, getStudentSubmissionsController, getAllSubmissionsController,
        getSubmissionByIdController, updateSubmissionController, deleteSubmissionController}
from '../controllers/submission.controller';
import { validate } from '../middlewares/validate.middleware';
import { submissionSchema, updateSubmissionSchema } from '../validations/submission.validation';
import { authorizeRoles } from '../middlewares/role.middleware';
import { protect } from '../middlewares/auth.middleware';

const router = express.Router();

router.post('/create', protect, authorizeRoles('student'), validate(submissionSchema), submitAssessment);
router.post('/resubmit/:assessmentId', protect, authorizeRoles('student'), validate(submissionSchema), resubmitSubmissionController);
router.get('/my', protect, authorizeRoles('student'), getStudentSubmissionsController);
router.get('/all', protect, authorizeRoles('admin', 'instructor'), getAllSubmissionsController);
router.get('/:id', protect, getSubmissionByIdController);
router.put('/update/:id', protect, authorizeRoles('instructor'), validate(updateSubmissionSchema), updateSubmissionController);
router.delete('/delete/:id', protect, authorizeRoles('admin', 'instructor'), deleteSubmissionController);

export default router;