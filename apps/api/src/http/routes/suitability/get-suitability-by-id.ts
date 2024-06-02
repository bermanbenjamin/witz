import { FastifyInstance } from 'fastify'
import { ZodTypeProvider } from 'fastify-type-provider-zod'
import { z } from 'zod'

import { auth } from '@/http/middlewares/auth';
import { prisma } from '@/lib/prisma';
import { getUserPermissions } from '@/utils/get-user-permissions';

import { MethodNotAllowedError } from '../_errors/method-not-allowed-error';

export async function getSuitabilityById(app: FastifyInstance){
    app.withTypeProvider<ZodTypeProvider>().register(auth).get(
        '/suitabilities/:id',
        {
            schema: {
                tags: ['Suitability'],
                summary: 'Get a suitability by id',
        security: [{ bearerAuth: [] }],
        params: z.object({
                    id: z.string()
                })
            }
        },
        async (request, reply) => {
            const { id } = request.params

            const { sub, role } = await request.getCurrentUserProps()

            const { cannot } = getUserPermissions(sub, role)

            if(cannot('get', 'Suitability', id)){
                throw new MethodNotAllowedError(`You're not allowed to get this suitability information.`)
            }

            const suitability = await prisma.suitability.findUnique({
                where: {
                    id
                },
                include: {
                    answers: true,
                },
            })

            return reply.status(200).send(suitability)
        }
    );
}