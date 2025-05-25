import express from 'express';
import * as EnrollmentController from '../controllers/enrollment.controller';
import { protect } from '../middlewares/auth.middleware';
import { authorizeRoles } from '../middlewares/role.middleware';

const router = express.Router();

router.use(protect);

router.post('/create', protect, authorizeRoles('admin, student'), EnrollmentController.enroll);
router.get('/getById', protect, authorizeRoles('student'), EnrollmentController.getMyEnrollments);
router.get('/all', protect, authorizeRoles('admin', 'instructor'), EnrollmentController.getAllEnrollments);
router.get('/course/:courseId', protect, authorizeRoles('admin', 'instructor') ,EnrollmentController.getEnrolledStudents);
router.patch('/complete/:id', protect, authorizeRoles('admin', 'instructor'), EnrollmentController.updateEnrollmentCompletion);
router.delete('/delete/:id', protect, authorizeRoles('admin'), EnrollmentController.deleteEnrollment);
router.get('/stats', protect, authorizeRoles('admin'), EnrollmentController.getStatsController);


export default router;