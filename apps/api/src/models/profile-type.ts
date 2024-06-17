import z from 'zod'

export const profileSchema = z.enum([
  'SUPER_CONSERVER',
  'CONSERVER',
  'MODERATE',
  'AGRESSIVE',
  'SUPER_AGRESSIVE',
])

export type ProfileType = z.infer<typeof profileSchema>
