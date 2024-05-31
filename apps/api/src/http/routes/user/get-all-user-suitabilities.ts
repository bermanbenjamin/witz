import { log } from 'console'
import { FastifyInstance } from 'fastify'
import { ZodTypeProvider } from 'fastify-type-provider-zod'
import { z } from 'zod'

import { prisma } from '@/lib/prisma'
import { errorSchema } from '@/schemas/base-schema'

import { BadRequestError } from '../_errors/bad-request-error'

export const responseSchema200 = z.array(z.object({
  id: z.string(),
  createdAt: z.date(),
  score: z.number(),
  userId: z.string().nullable(),
  answers: z.array(z.object({
    id: z.number(),
    questionId: z.number(),
    choosedAlternativesId: z.array(z.number()),
  })),
}));


export async function getAllSuitabilitiesByUserId(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().get(
    '/users/:userId/suitabilities',
    {
     schema: {
      description: 'Get all suitabilities for a user id',
      tags: ['User'],
      params: z.object({
        userId: z.string().uuid(),
      }),
      response: {
        200: responseSchema200,
        404: errorSchema,
        500: errorSchema,
      },
     }
    },
    async (request, reply) => {
      try {
        const { userId } = request.params

        const userExists = await prisma.user.findFirst({
          where: { id: userId },
        })
  
        if (!userExists) {
          throw new BadRequestError('User not found')
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
