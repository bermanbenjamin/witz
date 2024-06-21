import type { z } from 'zod'

import type { suitabilitySchema } from '@/schemas/base-schema'

export type SuitabilityDTO = z.infer<typeof suitabilitySchema>