import { z } from 'zod';

export const submissionSchema = z.object({
  assessmentId: z.string().min(1, "Assessment ID is required"),
  answers: z.array(
    z.object({
      questionId: z.string().min(1, "Question ID is required"),
      answer: z.union([z.string(), z.boolean()])
    })
  ).min(1, "At least one answer is required")
});

export const updateSubmissionSchema = z.object({
  answers: z
    .array(
      z.object({
        questionId: z.string(),
        answer: z.union([z.string(), z.boolean()])
      })
    )
    .optional(),
  score: z.number().optional(),
  status: z.enum(['passed', 'failed']).optional()
});