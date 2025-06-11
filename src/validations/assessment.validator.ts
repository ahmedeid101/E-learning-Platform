import { date, z } from 'zod';

export const createAssessmentSchema  = z.object({
    course: z.string().length(24, 'Invalid course ID'),
    title: z.string().min(3),
    totalMarks: z.number().min(1),
    passingScore: z.number().min(0),
    dueDate: z.string().refine(val => !isNaN(Date.parse(val)),{
        message: 'Invalid date',
    }),

    questions: z.array(
        z.object({
            text: z.string().min(1),
            type: z.enum(['mcq', 'boolean']),
            options: z.array(z.string()).optional(),
            correctAnswer: z.union([z.string(), z.boolean()]),
        }).refine(q => {
            if(q.type === 'mcq'){
                return Array.isArray(q.options) && q.options.length > 1;
            }
            return true;
            },{
            message: 'MCQ questions must have at least two options',
        })
    ).min(1)
});

export const updateAssessmentSchema = z.object({
  title: z.string().optional(),
  totalMarks: z.number().optional(),
  passingScore: z.number().optional(),
  dueDate: z.string().optional(),
  questions: z.array(
    z.object({
      text: z.string(),
      type: z.enum(['mcq', 'boolean']),
      options: z.array(z.string()).optional(),
      correctAnswer: z.union([z.string(), z.boolean()])
    })
  ).optional()
});