import z from 'zod'

export const profileSchema = z
  .enum(['SUPER_CONSERVER', 'CONSERVER', 'MODERATE', 'AGRESSIVE', 'SUPER_AGRESSIVE'])
  .nullable()

export type ProfileType = z.infer<typeof profileSchema>
