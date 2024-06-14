import { FastifyInstance } from 'fastify'
import { ZodTypeProvider } from 'fastify-type-provider-zod'
import { z } from 'zod'

import { auth } from '@/http/middlewares/auth'
import { prisma } from '@/lib/prisma'
import { errorSchema, userSchema } from '@/schemas/base-schema'

export async function getAllUsers(app: FastifyInstance){
    app.withTypeProvider<ZodTypeProvider>().register(auth).get(
        '/users',
        {
            schema: {
                tags: ['User'],
                summary: 'Get all users',
        security: [{ bearerAuth: [] }],
                response: {
                  200: z.object({
                    users: z.array(userSchema),
                  }),
                  404: errorSchema,
                  500: errorSchema,
                },
            }
        },
        async (_, reply) => {
            const users = await prisma.user.findMany({
                select: {
                    id: true,
                    name: true,
                    email: true,
                    role: true,
                    createdAt: true,
                },
            });

            return reply.status(200).send({
                users,
            });
        }
    );
}
