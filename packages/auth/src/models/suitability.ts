import { z } from 'zod'

import { roleSchema } from '../roles'

export const suitabilitySchema = z.object({
  __typename: z.literal('Suitability').default('Suitability').optional(),
  id: z.string(),
  role: roleSchema,
})

export type Suitability = z.infer<typeof suitabilitySchema>
