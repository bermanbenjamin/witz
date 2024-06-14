import { z } from 'zod'

export const userSchema = z.object({
  id: z.string(),
  name: z.string().nullable(),
  email: z.string().email(),
  role: z.string(),
  createdAt: z.date(),
})

export const suitabilitySchema = z.object({
  id: z.string(),
  createdAt: z.date(),
  score: z.number(),
});

export const answerSchema = z.object({
  id: z.string(),
  questionId: z.string(),
  choosedAlternatives: z.array(z.number()),
});

export const paginationSchema = z.object({
  page: z.number().int().positive().default(1),
  limit: z.number().int().positive().default(10),
});

export const errorSchema =  z.object({ message : z.string()})

export const noContentSchema = z.string().default('No Content')