import { FastifyInstance } from 'fastify'
import { ZodTypeProvider } from 'fastify-type-provider-zod'
import { z } from 'zod'

import { prisma } from '@/lib/prisma';

import { BadRequestError } from '../_errors/bad-request-error';

export interface UserMagicLinkJWT {
  email: string;
}

export async function magicLinkVerify(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().post('/auth/magic-link', {
    schema: {
      tags: ['Auth'],
      summary: 'Authenticate with magic link token',
      body: z.object({
        token: z.string(),
      }),
      response: {
        201: z.object({
          token: z.string(),
        }),
      },
    },
    handler: async (request, reply) => {
      const { token } = request.body;

      try {
        const { payload } = app.jwt.decode(token) as UserMagicLinkJWT;

        const userFromEmail = await prisma.user.findUnique({
          where: {
            email: payload.email,
          },
        });

        if (!userFromEmail) {
          throw new BadRequestError('Invalid credentials.');
        }

        if (userFromEmail.role !== 'GUEST') {
          throw new BadRequestError('User is not a guest, use credentials login.');
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
        );

        return reply.status(201).send({ token: sessionToken });
      } catch (error) {
        throw new BadRequestError('Invalid token provided.');
      }
    },
  });
}
