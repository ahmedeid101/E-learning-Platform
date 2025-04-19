import express from 'express';
import { getProfile, updateProfile, deleteProfile, getAllProfiles, deleteAnyProfile } from '../controllers/userController';
import { protect } from '../middleware/authMiddleware';
import { authorizeRoles } from '../middleware/roleMiddleware';

const router= express.Router();

router.get('/profile', protect, getProfile);
router.put('/profile', protect, updateProfile);
router.delete('/profile', protect, deleteProfile);

// Admin-only routes
router.get('/', protect, authorizeRoles('admin'), getAllProfiles);
router.delete('/:id', protect, authorizeRoles('admin'), deleteAnyProfile);


export default router;