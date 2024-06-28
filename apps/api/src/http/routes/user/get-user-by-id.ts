import { FastifyInstance } from 'fastify'
import { ZodTypeProvider } from 'fastify-type-provider-zod'
import { z } from 'zod'

import { auth } from '@/http/middlewares/auth'
import { prisma } from '@/lib/prisma'
import { userSchema } from '@/schemas/base-schema'
import { getUserPermissions } from '@/utils/get-user-permissions'

import { BadRequestError } from '../_errors/bad-request-error'
import { MethodNotAllowedError } from '../_errors/method-not-allowed-error'

export async function getUserById(app: FastifyInstance){
    app.withTypeProvider<ZodTypeProvider>().register(auth).get(
      '/users/:id',
      {
        schema: {
          tags: ['User'],
          summary: 'Get a user by id',
          security: [{ bearerAuth: [] }],
          params: z.object({
              id: z.string().min(1),
          }), 
          response: {
              200: userSchema,
          }
        }
      },
      async (request, reply) => {
          const { id } = request.params

          const { sub, role } = await request.getCurrentUserProps()

          const { cannot } = getUserPermissions(sub, role)

          if(cannot('get', 'User')){
              throw new MethodNotAllowedError(`You're not allowed to get this user.`)
          }

         const user = await prisma.user.findUnique({
              where: {
                id
              },
              select: {
                id: true,
                name: true,
                email: true,
                birthDate: true,
                cpf: true,
                phone: true,
                suitabilities: true,
                profileType: true,
                role: true,
                createdAt: true,
              },
          })

          if (!user) throw new BadRequestError('User not found')

          return reply.status(200).send(user)
      }

    )
}