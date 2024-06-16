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
          body: z.object({
            email: z.string().email(),
          })
        }
      },
      async (req, res) => {
        try {
          const { email } = req.body;

          const { mailer } = app;

          const token = await res.jwtSign(
            {
              email,
            },
            {
              sign: {
                expiresIn: '30m',
              },
            },
          )

          const magicLink = `http://localhost:3000/auth/magic-link/${token}`;

          await mailer.sendMail({
            to: email,
            subject: "Magic Link",
            text: `Hi, click on this link to continue to the app: ${magicLink}`,
          });

          res.send();
        } catch (error) {
          res.status(500).send(error);
        }
      })
}