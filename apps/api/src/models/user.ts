import type { z } from 'zod'

import type { userSchema } from '@/schemas/base-schema'

export type UserDTO = z.infer<typeof userSchema>
