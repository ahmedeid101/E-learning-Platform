import { Request, Response } from "express";
import * as AuthService from '../services/auth.services';
import { registerSchema, loginSchema } from '../validations/user.validator';
import { zodValidate } from "../utils/zod";

export const register = async(req: Request, res: Response): Promise<void> =>{
    const validated = zodValidate(registerSchema, req.body, res);
        if(!validated) return;
    try {
        await AuthService.registerUser(validated);
        res.status(201).json({ message: 'User created successfully' });
        } catch (error: any) {
            res.status(400).json({ message: error.message });
    }
}

export const login = async(req: Request, res: Response) =>{
    const validated = zodValidate(loginSchema, req.body, res);
        if(!validated) return;
    try {
         const token = await AuthService.loginUser(validated);
            //res.status(200).json({ message: 'User logged in successfully' });
         res.json({ token });
    } catch (error: any) {
         res.status(401).json({ message: error.message });
    }
}