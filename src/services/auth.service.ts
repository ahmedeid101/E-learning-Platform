import {User} from '../models/User';
import { AuthCredentials, RegisterInput } from '../types/auth.types';
import {hashPassword, comparePassword} from '../utils/hash';
import {generateToken} from '../utils/jwt';

export const registerUser = async(data: RegisterInput) =>{
    const existing = await User.findOne({email: data.email});
    if(existing) throw new Error('Email already exists');

    const hashed = await hashPassword(data.password);
    const user = await User.create({...data, password: hashed})

    return user;
};

export const loginUser = async (cred: AuthCredentials) =>{
    
    const user = await User.findOne({email: cred.email});
    if(!user) throw new Error('Invalid email or password');

    const isMatch = await comparePassword(cred.password, user.password);
    if(!isMatch) throw new Error('Invalid email or password');
    
    return generateToken({ userId: user._id, role: user.role });
}