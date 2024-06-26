import { z } from 'zod'

import { roleSchema } from '../roles'

export const walletSchema = z.object({
  __typename: z.literal('Wallet').default('Wallet').optional(),
  id: z.string(),
  role: roleSchema,
})

export type Wallet = z.infer<typeof walletSchema>
