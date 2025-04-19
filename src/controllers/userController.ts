import { Request, Response } from "express";
import { getUserProfile, updateUserProfile, deleteUserProfile, getAllUsers, deleteAnyUser } from '../services/userService';
import {AuthRequest} from '../middleware/authMiddleware';
import { updateUserSchema } from '../validations/userValidation';


export const getProfile = async (req: AuthRequest, res: Response): Promise<void> => {
    try {
      const user = await getUserProfile(req.user.id);
      if (!user) {
        res.status(404).json({ message: 'User not found' });
        return;
      }
      res.status(200).json(user);
    } catch (error) {
      res.status(500).json({ message: 'Server error' });
    }
  };
  

export const updateProfile = async (req: AuthRequest, res: Response): Promise<void> => {
    try {
    const parsed = updateUserSchema.safeParse(req.body);
    if (!parsed.success) {
      res.status(400).json({ errors: parsed.error.flatten().fieldErrors });
    }
      const updatedUser = await updateUserProfile(req.user.id, parsed.data);
      res.json(updatedUser);
    } catch (error) {
      res.status(500).json({ message: 'Failed to update profile' });
    }
};

export const deleteProfile = async (req: AuthRequest, res: Response) => {
  try {
    const user = await deleteUserProfile(req.user.id);
    if (!user) {
      res.status(404).json({ message: 'user not found or not authorized' });
    }
    res.json({ message: 'User deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to delete user' });
  }
  
};

// Admin-only actions
export const getAllProfiles = async (_req: Request, res: Response) => {
  const users = await getAllUsers();
  res.json(users);
};

export const deleteAnyProfile = async (req: Request, res: Response) => {
  const userId = req.params.id;
  const deletedUser = await deleteAnyUser(userId);
  if (!deletedUser) {
    res.status(404).json({ message: 'User not found' });
  }
  res.status(200).json({ message: 'User deleted successfully' });
};