import express from 'express';
import { getProfile, updateProfile, deleteProfile, getAllProfiles, deleteAnyProfile } from '../controllers/user.controller';
import { protect } from '../middlewares/auth.middleware';
import { authorizeRoles } from '../middlewares/role.middleware';

const router= express.Router();

router.get('/profile/:id', protect, getProfile);
router.put('/profile', protect, updateProfile);
router.delete('/profile', protect, deleteProfile);

// instructor-only routes
router.get('/profile/getAll', protect, authorizeRoles('admin'), getAllProfiles);
router.delete('/delete/:id', protect, authorizeRoles('admin'), deleteAnyProfile);


export default router;