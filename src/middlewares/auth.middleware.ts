import { Request, Response, NextFunction } from "express";
import {verifyToken} from '../utils/jwt.util';
import { JwtPayload } from "jsonwebtoken";

export interface AuthRequest extends Request{
    user?: any;
}

export const protect = (req: AuthRequest, res: Response, next: NextFunction): void =>{
    try {
        const authHeader = req.headers.authorization;
        // authHeader = "Bearer eyJhbGciOi..."
        if (!authHeader || !authHeader.startsWith('Bearer')) {
            res.status(401).json({ message: 'Not authorized, no token' });
            return;
        }
        const token = authHeader.split(' ')[1];
        // token = "eyJhbGciOi...
        // console.log('Token:', token); // Debug line
        const decoded = verifyToken(token) as JwtPayload;
        req.user = { id: decoded.userId, role: decoded.role }; // Extend as needed        
        return next();
    } catch (error) {
        res.status(401).json({massage: "Not authorized, token failed"});

    }
};
