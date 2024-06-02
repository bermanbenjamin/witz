import { FastifyInstance } from 'fastify'
import { ZodTypeProvider } from 'fastify-type-provider-zod'
import { z } from 'zod'

import { auth } from '@/http/middlewares/auth'
import { prisma } from '@/lib/prisma'
import { errorSchema, noContentSchema } from '@/schemas/base-schema'
import { getUserPermissions } from '@/utils/get-user-permissions'

import { MethodNotAllowedError } from '../_errors/method-not-allowed-error';

export async function deleteUserById(app: FastifyInstance){
    app.withTypeProvider<ZodTypeProvider>().register(auth).delete(
        '/users/:id',
        {
            schema: {
                tags: ['User'],
                summary: 'Delete a user by id',
                security: [{ bearerAuth: [] }],
                params: z.object({
                    id: z.string().min(1),
                }), 
                response: {
                    204: noContentSchema,
                    405: errorSchema
                }
            }
        },
        async (request, reply) => {
            const { id } = request.params

            const { sub, role } = await request.getCurrentUserProps()

            const { cannot } = getUserPermissions(sub, role)

            if(cannot('delete', 'User', id)){
                throw new MethodNotAllowedError(`You're not allowed to delete this user.`)
            }

            await prisma.user.delete({
                where: {
                    id
                }
            })

            return reply.status(204).send()
        }

    )
}