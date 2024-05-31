import { z } from 'zod'

import { suitabilitySchema } from '../models/suitability'

export const suitabilitySubject = z.tuple([
  z.union([
    z.literal('manage'),
    z.literal('get'),
    z.literal('create'),
    z.literal('update'),
    z.literal('delete'),
  ]),
  z.union([z.literal('Suitability'), suitabilitySchema]),
])

export type SuitabilitySubject = z.infer<typeof suitabilitySubject>
