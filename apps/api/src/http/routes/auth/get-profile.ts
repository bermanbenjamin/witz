import type { FastifyInstance } from 'fastify'
import type { ZodTypeProvider } from 'fastify-type-provider-zod'
import { z } from 'zod'

import { auth } from '@/http/middlewares/auth'
import { prisma } from '@/lib/prisma'
import { profileSchema } from '@/models/profile-type'

import { suitabilitySchema } from '../../../schemas/base-schema'
import { BadRequestError } from '../_errors/bad-request-error'

export async function getProfile(app: FastifyInstance) {
  app
    .withTypeProvider<ZodTypeProvider>()
    .register(auth)
    .get(
      '/profile',
      {
        schema: {
          tags: ['Auth'],
          summary: 'Get Authenticated user profile',
          security: [{ bearerAuth: [] }],
          response: {
            200: z.object({
              user: z.object({
                id: z.string().uuid(),
                name: z.string().nullable(),
                email: z.string().email(),
                role: z.string(),
                profileType: profileSchema.nullable(),
                suitabilities: suitabilitySchema.array(),
              }),
            }),
          },
        },
      },
      async (request, reply) => {
        const { sub: userId } = await request.getCurrentUserProps()

        const user = await prisma.user.findUnique({
          select: {
            id: true,
            name: true,
            email: true,
            role: true,
            profileType: true,
            suitabilities: true,
          },
          where: {
            id: userId,
          },
        })

        if (!user) throw new BadRequestError('Usuário não encontrado.')

        return reply.send({ user })
      },
    )
}
