import { z } from 'zod'

import { walletSchema } from '../models/wallet'

export const walletSubject = z.tuple([
  z.union([
    z.literal('manage'),
    z.literal('get'),
    z.literal('create'),
    z.literal('update'),
    z.literal('delete'),
  ]),
  z.union([z.literal('Wallet'), walletSchema]),
])

export type WalletSubject = z.infer<typeof walletSubject>
