import { Request, Response } from "express";
import * as AuthService from '../services/auth.service';
import { registerSchema, loginSchema } from '../validations/user.validation';

export const register = async(req: Request, res: Response): Promise<void> =>{
    try {
        const parsed = registerSchema.safeParse(req.body);
        if (!parsed.success) {
            res.status(400).json({ errors: parsed.error.flatten().fieldErrors });
            return;
        }
        await AuthService.registerUser(parsed.data);
        res.status(201).json({ message: 'User created successfully' });
        } catch (error: any) {
            res.status(400).json({ message: error.message });
    }
}

export const login = async(req: Request, res: Response) =>{
    try {
        const parsed = loginSchema.safeParse(req.body);
        if (!parsed.success) {
            res.status(400).json({ errors: parsed.error.flatten().fieldErrors });
            return;
        }
         const token = await AuthService.loginUser(parsed.data);
            //res.status(200).json({ message: 'User logged in successfully' });
         res.json({ token });
         } catch (error: any) {
            res.status(401).json({ message: error.message });
    }
}