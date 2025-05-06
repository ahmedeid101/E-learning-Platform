import { User } from '../models/User';
import { IUser } from '../types/user.type';

export const getUserProfile = async(userId: string): Promise<IUser | null> =>{
    const user = await User.findById(userId).select('-password');
    return user;
};

export const updateUserProfile = async(userId: string, updates: any): Promise<IUser | null> =>{
    const user = await User.findByIdAndUpdate(userId, updates, {new: true}).select('-password');
    return user;
};

export const deleteUserProfile = async (userId: string): Promise<IUser | null> => {
    const user =  await User.findOneAndDelete({ _id: userId });
    return user;
};

// instructor-only actions
export const getAllUsers = async (): Promise<IUser[]> => {
    const user = await User.find().select('-password');
    return user;
  };
  
  export const deleteAnyUser = async (userId: string): Promise<IUser | null> => {
    return User.findByIdAndDelete(userId);
  };