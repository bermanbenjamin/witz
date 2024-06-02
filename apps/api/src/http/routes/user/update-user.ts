import { hash } from 'bcryptjs'
import { FastifyInstance } from 'fastify'
import { ZodTypeProvider } from 'fastify-type-provider-zod'
import { z } from 'zod'

import { auth } from "@/http/middlewares/auth"
import { prisma } from '@/lib/prisma'
import { userUpdateSchema } from '@/schemas/user-schema'
import { getUserPermissions } from '@/utils/get-user-permissions'

import { MethodNotAllowedError } from '../_errors/method-not-allowed-error'

export async function updateUserById(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().register(auth).put(
    '/users/:id',
    {
      schema: {
        tags: ['User'],
        summary: 'Update user by id',
        security: [{ bearerAuth: [] }],
        body: userUpdateSchema,
        params: z.object({ id: z.string() }),
      },
    },
    async (request, reply) => {
      const { name, email, password, role: newRole } = request.body
      const { id } = request.params
      const { sub, role } = await request.getCurrentUserProps()

      const { cannot } = getUserPermissions(sub, role)

      if (cannot('update', 'User', id)) {
        throw new MethodNotAllowedError(`You're not allowed to update this user`)
      }

      const user = await prisma.user.findUnique({
        where: {
          id,
        },
      })

      if (!user) {
        return reply.status(404).send({ message: 'User with id not found' })
      }

      let newPasswordHash = null
      if (password) {
        newPasswordHash = await hash(password, 6)
      }

      const updatedUser = await prisma.user.update({
        where: {
          id,
        },
        data: {
          name: name || user.name,
          email: email || user.email,
          passwordHash: newPasswordHash || user.passwordHash,
          role: newRole || user.role
        },
      })

      return reply.status(200).send(updatedUser)
    }
  )
}
