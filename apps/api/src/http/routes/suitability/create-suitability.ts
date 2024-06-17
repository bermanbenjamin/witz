import { ProfileType } from '@prisma/client'
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
          201: z.object({
            suitability: suitabilitySchema,
            updatedUser: z.object({
              name: z.string().nullable(),
              email: z.string().email(),
              profileType: z
                .enum([
                  'SUPER_CONSERVER',
                  'CONSERVER',
                  'MODERATE',
                  'AGRESSIVE',
                  'SUPER_AGRESSIVE',
                ]),
            })
          }),
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

        if (cannot('create', 'Suitability', userId)) {
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
        let profileType: ProfileType;

        if (score <= 350) {
          profileType = ProfileType.SUPER_CONSERVER;
        } else if (score <= 600) {
          profileType = ProfileType.CONSERVER;
        } else if (score <= 1300) {
          profileType = ProfileType.MODERATE;
        } else if (score <= 2000) {
          profileType = ProfileType.AGRESSIVE;
        } else {
          profileType = ProfileType.SUPER_AGRESSIVE;
        }

        const [suitability, updatedUser] = await prisma.$transaction([
          prisma.suitability.create({
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
          }),

          prisma.user.update({
            where: {
              id: userId,
            },
            data: {
              profileType
            },
            select: {
              name: true,
              email: true,
              profileType: true,
            }
          })

        ])

        return reply.status(201).send({ suitability, updatedUser });
      } catch (error) {
        if (error instanceof ZodError) {
          return reply.status(400).send({ message: error.errors })
        }
        reply.status(500).send({ message: 'Internal Server Error' })
      }
    }
  )
}
