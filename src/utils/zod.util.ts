/*
  Zod is a TypeScript-first schema declaration and validation library
  We use it to validate request parameters before hitting the business logic
  To prevent invalid input (e.g., malformed ids) from causing unexpected behavior or errors.
*/

import { ZodSchema } from 'zod';
import { Response } from 'express';

export const zodValidate = <T>(schema: ZodSchema<T>, data: unknown, res: Response): T | undefined => {
    const result = schema.safeParse(data);
    if (!result.success) {
      const errors: any = {};
      result.error.errors.forEach(err => {
        if (err.path.length > 0) {
          const key = err.path[0] as string;
          errors[key] = errors[key] || [];
          errors[key].push(err.message);
        }
      });
      res.status(400).json({ errors });
      return;
    }
    return result.data;
  };
  

// export function zodValidate<T> (schema: ZodSchema, data: unknown, res: Response): T | null {
//     const result = schema.safeParse(data);
//     if(!result.success){
//         res.status(400).json({ errors: result.error.flatten().fieldErrors });
//         return null;
//     }
//     return result.data;
// };