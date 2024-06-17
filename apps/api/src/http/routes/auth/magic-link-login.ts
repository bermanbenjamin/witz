import { FastifyInstance } from 'fastify'
import { ZodTypeProvider } from 'fastify-type-provider-zod'
import { z } from 'zod'

export async function magicLinkLogin(app: FastifyInstance) {
  app
    .withTypeProvider<ZodTypeProvider>()
    .post('/auth/magic-link/login',
      {
        schema: {
          tags: ['Auth'],
          summary: 'Authenticate with magic link',
          body: z.object({
            email: z.string().email(),
            name: z.string(),
          })
        }
      },
    async (request, reply) => {
      const { email, name } = request.body;

      const { mailer } = app;

      const token = await reply.jwtSign(
        {
          email,
          name,
        },
        {
          sign: {
            expiresIn: '30m',
          },
        },
      )

      const magicLink = `${process.env.NEXT_PUBLIC_BASE_URL}/auth/magic-link/${token}`;

      await mailer.sendMail({
        to: email,
        subject: "Magic Link",
        text: `Hi ${name}, click on this link to continue to the app: ${magicLink}`,
      });

      reply.send();
    })
}