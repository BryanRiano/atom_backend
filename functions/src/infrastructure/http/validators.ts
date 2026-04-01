import { z } from 'zod';

export const emailQuerySchema = z.object({
  email: z.string().email(),
});

export const emailBodySchema = z.object({
  email: z.string().email(),
});

export const createTaskBodySchema = z.object({
  title: z.string().min(1).max(500),
  description: z.string().max(5000).optional().default(''),
});

export const updateTaskBodySchema = z.object({
  title: z.string().min(1).max(500).optional(),
  description: z.string().max(5000).optional(),
  completed: z.boolean().optional(),
});
