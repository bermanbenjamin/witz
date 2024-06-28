import { z } from 'zod'

import { profileSchema } from '@/models/profile-type'

export const suitabilitySchema = z.object({
  id: z.string(),
  createdAt: z.date(),
  score: z.number(),
})

export const userSchema = z.object({
  id: z.string(),
  name: z.string().nullable(),
  email: z.string().email(),
  phone: z.string().nullable(),
  cpf: z.string().nullable(),
  birthDate: z.string().nullable(),
  profileType: profileSchema,
  suitabilities: suitabilitySchema.array(),
  role: z.string(),
  createdAt: z.date(),
})

export const answerSchema = z.object({
  id: z.string(),
  questionId: z.string(),
  choosedAlternatives: z.array(z.number()),
})

export const paginationSchema = z.object({
  page: z.number().int().positive().default(1),
  limit: z.number().int().positive().default(10),
})

export const errorSchema = z.object({ message: z.string() })

export const noContentSchema = z.string().default('No Content')
