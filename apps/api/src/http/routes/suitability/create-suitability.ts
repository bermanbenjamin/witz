import { FastifyInstance } from 'fastify'
import { ZodTypeProvider } from 'fastify-type-provider-zod'
import { z, ZodError } from 'zod'

import { prisma } from '@/lib/prisma'
import { CalculateSuitabilityScore } from '@/service/calculate-score'

export async function createSuitability(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().post(
    '/suitability',
    {
      schema: {
        tags: ['Auth'],
        summary: 'Create a suitability answer',
        body: z.object({
          userId: z.string(),
          questions: z
            .object({
              questionId: z.number(),
              choosedAlternativeId: z.number(),
            })
            .array(),
        }),
      },
    },
    async (request, reply) => {
      try {
        const { userId, questions } = request.body

        const userExists = await prisma.user.findFirst({
          where: { id: userId },
        })

        if (!userExists) {
          return reply.status(400).send({ message: 'User not found' })
        }

        const score = await CalculateSuitabilityScore(questions)

        const suitability = await prisma.suitability.create({
          data: {
            userId,
            answers: {
              create: questions.map((question) => ({
                questionId: question.questionId,
                choosedAlternativeId: question.choosedAlternativeId,
              })),
            },
            score,
          },
        })

        return reply.status(201).send(suitability)
      } catch (error) {
        if (error instanceof ZodError) {
          return reply.status(400).send({ message: error.errors })
        }
        reply.status(500).send({ message: 'Internal Server Error' })
      }
    }
  )
}