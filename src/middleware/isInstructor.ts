import { Response, NextFunction } from "express";
import { AuthRequest } from "./authMiddleware";

export const isInstructor = (req: AuthRequest, res: Response, next: NextFunction) =>{
    if(req.user?.role !== 'instructor'){
        res.status(403).json({ message: 'Forbidden: Only instructors allowed' });
    }
    next();
};