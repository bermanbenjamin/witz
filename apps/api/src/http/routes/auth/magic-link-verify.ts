import { FastifyInstance } from 'fastify'
import { ZodTypeProvider } from 'fastify-type-provider-zod'
import { z } from 'zod'

import { prisma } from '@/lib/prisma'

import { BadRequestError } from '../_errors/bad-request-error'

export interface UserMagicLinkJWT {
  name: string
  email: string
}

export async function magicLinkVerify(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().post(
    '/auth/magic-link/verify',
    {
      schema: {
        tags: ['Auth'],
        summary: 'Authenticate with magic link verification.',
        body: z.object({
          token: z.string(),
        }),
        response: {
          201: z.object({
            token: z.string(),
          }),
        },
      },
    },
    async (request, reply) => {
      const { token } = request.body

      const { payload } = app.jwt.decode(token) as { payload: UserMagicLinkJWT }

      const userFromEmail = await prisma.user.findFirst({
        where: {
          email: payload.email,
        },
      })

      if (!userFromEmail) {
        const user = await prisma.user.create({
          data: {
            name: payload.name,
            email: payload.email,
          },
        })

        const sessionToken = await reply.jwtSign(
          {
            sub: user.id,
            role: user.role,
          },
          {
            sign: {
              expiresIn: '7d',
            },
          },
        )

        return reply.status(201).send({ token: sessionToken })
      }

      if (userFromEmail.role !== 'GUEST') {
        throw new BadRequestError(
          'Usuário não é um convidado, volte para a página de login.',
        )
      }

      const sessionToken = await reply.jwtSign(
        {
          sub: userFromEmail.id,
          role: userFromEmail.role,
        },
        {
          sign: {
            expiresIn: '7d',
          },
        },
      )

      return reply.status(201).send({ token: sessionToken })
    },
  )
}
