import { log } from 'console'
import { FastifyInstance } from 'fastify'
import { ZodTypeProvider } from 'fastify-type-provider-zod'
import { z } from 'zod'

import { prisma } from '@/lib/prisma'

export async function getAllSuitabilitiesByUserId(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().get(
    '/users/:userId/suitabilities',
    {
     schema: {
      tags: ['User'],
      params: z.object({
        userId: z.string().uuid(),
      }),
      response: z.object({
        id: z.string(),
        createdAt: z.date(),
        score: z.number(),
        userId: z.string(),
        answers: z.object({
          id: z.string(),
          questionId: z.string(),
          choosedAlternatives: z.number().array(),
        }).array(),
      }),
     }
    },
    async (request, reply) => {
      try {
        const { userId } = request.params

        const userExists = await prisma.user.findFirst({
          where: { id: userId },
        })
  
        if (!userExists) {
          return reply.status(404).send({ message: 'User not found' })
        }
  
        const suitabilities = await prisma.suitability.findMany({
          where: {
            userId,
          },
          include: {
            answers: {
              select: {
                id: true,
                questionId: true,
                choosedAlternativesId: true,
              }
            },
          }
        })
  
        return reply.send(suitabilities)  
      } catch (error) {
        log(error)
      }
    }
  )
}
