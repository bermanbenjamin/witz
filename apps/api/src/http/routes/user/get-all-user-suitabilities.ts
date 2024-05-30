import { log } from 'console'
import { FastifyInstance } from 'fastify'
import { ZodTypeProvider } from 'fastify-type-provider-zod'

import { prisma } from '@/lib/prisma'

export async function getAllSuitabilitiesByUserId(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().get(
    '/users/:userId/suitabilities',
    {
     schema: {
      tags: ['User'],
     }
    },
    async (request, reply) => {
      try {
        const { userId } = request.params as { userId: string }

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
