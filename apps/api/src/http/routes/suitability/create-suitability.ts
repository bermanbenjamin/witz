import { hash } from 'bcryptjs'
import { FastifyInstance } from 'fastify'
import { ZodTypeProvider } from 'fastify-type-provider-zod'
import { z } from 'zod'

import { prisma } from '@/lib/prisma'

export async function createSuitability(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().post(
    '/suitability',
    {
      schema: {
        tags: ['Auth'],
        summary: 'Create a suitability answer',
        body: z.object({
          clientName: z.string().min(3),
          clientEmail: z.string().email(),
          questions: z
            .object({
              questionNumber: z.number(),
              alternative: z.number(),
            })
            .array(),
        }),
      },
    },
    async (request, reply) => {
      const { clientName, clientEmail, questionNumber, alternative } = re
    }
  )
}
