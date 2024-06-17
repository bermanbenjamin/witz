import { z } from 'zod'

export const userUpdateSchema = z.object({
  name: z.string().min(3).optional(),
  email: z.string().email().optional(),
  password: z.string().min(3).optional(),
  role: z.enum(['ADMIN', 'MEMBER', 'GUEST']).optional(),
  profileType: z
    .enum([
      'SUPER_CONSERVER',
      'CONSERVER',
      'MODERATE',
      'AGRESSIVE',
      'SUPER_AGRESSIVE',
    ])
    .optional(),
})