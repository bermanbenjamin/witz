import { FastifyInstance } from 'fastify'
import { ZodTypeProvider } from 'fastify-type-provider-zod'
import { z, ZodError } from 'zod'

import { auth } from '@/http/middlewares/auth'
import { prisma } from '@/lib/prisma'
import { errorSchema, suitabilitySchema } from '@/schemas/base-schema'
import { CalculateSuitabilityScore } from '@/service/calculate-score'
import { getUserPermissions } from '@/utils/get-user-permissions'

import { MethodNotAllowedError } from '../_errors/method-not-allowed-error'

export async function createSuitability(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().register(auth).post(
    '/suitabilities',
    {
      schema: {
        tags: ['Suitability'],
        summary: 'Create a suitability answer',
        security: [{ bearerAuth: [] }],
        body: z.object({
          userId: z.string().min(0),
          questions: z
            .object({
              questionId: z.number(),
              choosedAlternativesId: z.number().array(),
            })
            .array()
            .min(12)
            .max(12),
        }),
        response: {
          201: suitabilitySchema,
          404: errorSchema,
          400: z.object({ message: z.any() }),
          500: errorSchema
        },
        description: 'Create a new suitability',
        required: ['userId', 'questions']
      },
    },
    async (request, reply) => {
      try {
        const { questions, userId } = request.body
        const { sub, role } = await request.getCurrentUserProps()

        const { cannot } = getUserPermissions(sub, role)

        if(cannot('create', 'Suitability', userId)){
          throw new MethodNotAllowedError(
            `You're not allowed to create a new Suitability for this user.`,
          )
        }

        const userExists = await prisma.user.findFirst({
          where: { id: userId },
        })

        if (!userExists) {
          return reply.status(404).send({ message: 'User not found' })
        }


        const score = await CalculateSuitabilityScore(questions)

        const suitability = await prisma.suitability.create({
          data: {
            userId,
            answers: {
              createMany: {
                data: questions.map((question) => ({
                  questionId: question.questionId,
                  choosedAlternativesId: question.choosedAlternativesId,
                })),
              },
            },
            score,
          },
          select: {
            id: true,
            createdAt: true,
            score: true,
            answers: true,
          }
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
