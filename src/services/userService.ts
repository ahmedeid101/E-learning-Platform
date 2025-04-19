import { IUser, User } from '../models/User';

export const getUserProfile = async(userId: string) =>{
    const user = await User.findById(userId).select('-password');
    return user;
};

export const updateUserProfile = async(userId: string, updates: any) =>{
    const user = await User.findByIdAndUpdate(userId, updates, {new: true}).select('-password');
    return user;
};

export const deleteUserProfile = async (userId: string) => {
    const user =  await User.findOneAndDelete({ _id: userId });
    return user;
};

// Admin-only actions
export const getAllUsers = async (): Promise<IUser[]> => {
    const user = await User.find().select('-password');
    return user;
  };
  
  export const deleteAnyUser = async (userId: string): Promise<IUser | null> => {
    return User.findByIdAndDelete(userId);
  };