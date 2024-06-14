import { FastifyInstance } from 'fastify'
import { ZodTypeProvider } from 'fastify-type-provider-zod'
import { z, ZodError } from 'zod'

import { auth } from '@/http/middlewares/auth'
import { prisma } from '@/lib/prisma'
import { allocationSchema,errorSchema } from '@/schemas/base-schema'
import { CalculateAllocation } from '@/service/calculate-allocation'
import { getUserPermissions } from '@/utils/get-user-permissions'

import { MethodNotAllowedError } from '../_errors/method-not-allowed-error'

export async function createSuitability(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().register(auth).get(
    '/asset-allocation',
    {
      schema: {
        tags: ['Allocation'],
        summary: 'Get allocation by answers',
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
        description: 'Create a new suitability',
        required: ['userId', 'questions']
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

        if(cannot('create', 'Suitability', userId)){
          throw new MethodNotAllowedError(
            `You're not allowed to get a new Suitability for this user.`,
          )
        }

        const userExists = await prisma.user.findFirst({
          where: { id: userId },
        })

        if (!userExists) {
          return reply.status(404).send({ message: 'User not found' })
        }

        const allocationPortfolios = await CalculateAllocation(answer)

        userExists.qualifiedInvestor = (answer.investorType === 'IQ');
        userExists.investorProfile = profileMap[answer.investorProfile];

        const updatedUser = await prisma.user.update({
          where: {
            id: userExists.id,  // ou outro identificador exclusivo do usuário
          },
          data: userExists,
        })

        return reply.status(200).send(allocationPortfolios)

      } catch (error) {
        if (error instanceof ZodError) {
          return reply.status(400).send({ message: error.errors })
        }
        reply.status(500).send({ message: 'Internal Server Error' })
      }
    }
  )
}
