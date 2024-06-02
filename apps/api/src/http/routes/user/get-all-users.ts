import { FastifyInstance } from 'fastify'
import { ZodTypeProvider } from 'fastify-type-provider-zod'
import { z } from 'zod'

import { auth } from '@/http/middlewares/auth'
import { prisma } from '@/lib/prisma'
import { errorSchema, paginationSchema, userSchema } from '@/schemas/base-schema'



export async function getAllUsers(app: FastifyInstance){
    app.withTypeProvider<ZodTypeProvider>().register(auth).get(
        '/users',
        {
            schema: {
                tags: ['User'],
                summary: 'Get all users',
        security: [{ bearerAuth: [] }],
        querystring: paginationSchema,
                response: {
                  200: z.object({
                    users: z.array(userSchema),
                    totalUsers: z.number(),
                    totalPages: z.number(),
                    currentPage: z.number(),
                  }),
                  404: errorSchema,
                  500: errorSchema,
                },
            }
        },
        async (request, reply) => {
            const { page, limit } = request.query;

            const skip = (page - 1) * limit;
            const totalUsers = await prisma.user.count();
            const users = await prisma.user.findMany({
                skip,
                take: limit,
                select: {
                    id: true,
                    name: true,
                    email: true,
                    createdAt: true,
                },
            });

            const totalPages = Math.ceil(totalUsers / limit);

            return reply.status(200).send({
                users,
                totalUsers,
                totalPages,
                currentPage: page,
            });
        }
    );
}
