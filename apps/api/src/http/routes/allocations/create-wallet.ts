import { FastifyInstance } from 'fastify'
import { ZodTypeProvider } from 'fastify-type-provider-zod'
import { z, ZodError } from 'zod'

import { auth } from '@/http/middlewares/auth'
import { prisma } from '@/lib/prisma'
import { allocationSchema,errorSchema } from '@/schemas/base-schema'
import { CalculateScore } from '@/service/calculate-allocation'
import { getUserPermissions } from '@/utils/get-user-permissions'

import { MethodNotAllowedError } from '../_errors/method-not-allowed-error'

export async function createWallet(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().register(auth).post(
    '/wallet',
    {
      schema: {
        tags: ['Wallet'],
        summary: 'Create a wallet based on answers and link the user to an investor type.',
        security: [{ bearerAuth: [] }],
        body: z.object({
          userId: z.string().min(0),
          answer: z
            .object({
              investorProfile: z.string(),
              investorType: z.string(),
              totalValue: z.number(),
              imutableValue: z.number(),
              fiiValue: z.number(),
              dailyLiquityValue: z.number(),
              internationalValue: z.number()
            }),
        }),
        response: {
          201: allocationSchema,
          404: errorSchema,
          400: z.object({ message: z.any() }),
          500: errorSchema
        },
        description: 'Vinculate user to a investor type',
        required: ['userId', 'answer']
      },
    },
    async (request, reply) => {
      try {
        const { answer, userId } = request.body
        const { sub, role } = await request.getCurrentUserProps()
        const profileMap = {
          'SA': 'SUPER_AGRESSIVE',
          'A': 'AGRESSIVE',
          'M': 'MODERATE',
          'C': 'CONSERVATIVE',
          'SC': 'SUPER_CONSERVATIVE'
        };

        const { cannot } = getUserPermissions(sub, role)

        if(cannot('create', 'Wallet', userId)){
          throw new MethodNotAllowedError(
            `You're not allowed to create a new wallet for this user.`,
          )
        }

        const userExists = await prisma.user.findFirst({
          where: { id: userId },
        })

        if (!userExists) {
          return reply.status(404).send({ message: 'User not found' })
        }

        const score = await CalculateScore(answer)

        await prisma.wallet.create({
          data: {
            userId,
            answers: answer,
            score,
          },
          select: {
            id: true,
            createdAt: true,
            score: true,
            answers: true,
          }
        })

        userExists.qualifiedInvestor = (answer.investorType === 'IQ');
        userExists.investorProfile = profileMap[answer.investorProfile];

        await prisma.user.update({
          where: {
            id: userExists.id,
          },
          data: userExists,
        })

        return reply.status(200)

      } catch (error) {
        if (error instanceof ZodError) {
          return reply.status(400).send({ message: error.errors })
        }
        reply.status(500).send({ message: 'Internal Server Error' })
      }
    }
  )
}
