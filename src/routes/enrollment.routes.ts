import express from 'express';
import * as EnrollmentController from '../controllers/enrollment.controller';
import { protect } from '../middlewares/auth.middleware';
import { authorizeRoles } from '../middlewares/role.middleware';

const router = express.Router();

router.use(protect);

router.post('/create', authorizeRoles('student'), EnrollmentController.enroll);
router.get('/getById', authorizeRoles('student'), EnrollmentController.getMyEnrollments);
router.get('/course/:courseId',authorizeRoles('admin', 'instructor') ,EnrollmentController.getEnrolledStudents);
router.patch('/complete/:id', authorizeRoles('admin', 'instructor'), EnrollmentController.updateEnrollmentCompletion);

export default router;