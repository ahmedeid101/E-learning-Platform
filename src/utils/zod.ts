import { ZodSchema } from 'zod';
import { Response } from 'express';

export function zodValidate<T> (schema: ZodSchema, data: unknown, res: Response): T | null {
    const result = schema.safeParse(data);
    if(!result.success){
        res.status(400).json({ errors: result.error.flatten().fieldErrors });
        return null;
    }
    return result.data;
};