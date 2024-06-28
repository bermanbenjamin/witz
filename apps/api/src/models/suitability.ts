import type { z } from 'zod'

import { suitabilitySchema } from '../schemas/base-schema'

export type SuitabilityDTO = z.infer<typeof suitabilitySchema>
