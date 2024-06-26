import { FastifyInstance } from 'fastify'
import { ZodTypeProvider } from 'fastify-type-provider-zod'
import { z } from 'zod'

import { auth } from '@/http/middlewares/auth';
import { prisma } from '@/lib/prisma';
import { allocationSchema,errorSchema } from '@/schemas/base-schema'
import { CalculateAllocation } from '@/service/calculate-allocation'
import { getUserPermissions } from '@/utils/get-user-permissions';

import { MethodNotAllowedError } from '../_errors/method-not-allowed-error';

export async function getWalletById(app: FastifyInstance){
    app.withTypeProvider<ZodTypeProvider>().register(auth).get(
        '/wallet/:id',
        {
            schema: {
                tags: ['Wallet'],
                summary: 'Get a wallet by id',
        security: [{ bearerAuth: [] }],
        params: z.object({
                    id: z.string()
                }),
                response: {
                  201: allocationSchema,
                  404: errorSchema,
                  400: z.object({ message: z.any() }),
                  500: errorSchema
                },
            }
        },
        async (request, reply) => {
            const { id } = request.params

            const { sub, role } = await request.getCurrentUserProps()

            const { cannot } = getUserPermissions(sub, role)

            if(cannot('get', 'Wallet', id)){
                throw new MethodNotAllowedError(`You're not allowed to get this wallet information.`)
            }

            const wallet = await prisma.wallet.findUnique({
                where: {
                    id
                },
                include: {
                    answers: true,
                    userId: true
                },
            })
            
            const userExists = await prisma.user.findFirst({
                where: { id: wallet.userId }
              })
      
              if (!userExists) {
                return reply.status(404).send({ message: 'User not found' })
              }

            const investorType = userExists.qualifiedInvestor? 'IQ' : 'IC'
            const allocationPortfolios = await CalculateAllocation(wallet.score, userExists.investorProfile, investorType)

            return reply.status(200).send(allocationPortfolios)
        }
    );
}