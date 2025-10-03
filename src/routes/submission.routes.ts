import express from 'express';
import {submitAssessment, resubmitSubmissionController, getStudentSubmissionsController, getAllSubmissionsController,
        getSubmissionByIdController, updateSubmissionController, deleteSubmissionController}
from '../controllers/submission.controller';
import { validate } from '../middlewares/validate.middleware';
import { submissionSchema, resubmitSubmissionSchema, updateSubmissionSchema } from '../validations/submission.validation';
import { authorizeRoles } from '../middlewares/role.middleware';
import { protect } from '../middlewares/auth.middleware';

const router = express.Router();

router.post('/', protect, authorizeRoles('student', 'instructor'), validate(submissionSchema), submitAssessment);
router.post('/resubmit/:submissionId', protect, authorizeRoles('student'), validate(resubmitSubmissionSchema), resubmitSubmissionController);
router.get('/my', protect, authorizeRoles('student'), getStudentSubmissionsController);
router.get('/all', protect, authorizeRoles('admin', 'instructor'), getAllSubmissionsController);
router.get('/:id', protect, getSubmissionByIdController);
router.put('/:id', protect, authorizeRoles('instructor', 'student'), validate(updateSubmissionSchema), updateSubmissionController);
router.delete('/:id', protect, authorizeRoles('admin', 'instructor'), deleteSubmissionController);

export default router;