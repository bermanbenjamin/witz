import { z } from 'zod'

import { profileSchema } from '@/models/profile-type'

export const userUpdateSchema = z.object({
  name: z.string().min(3).optional(),
  email: z.string().email().optional(),
  password: z.string().min(3).optional(),
  role: z.enum(['ADMIN', 'MEMBER', 'GUEST']).optional(),
  profileType: profileSchema.optional(),
})
