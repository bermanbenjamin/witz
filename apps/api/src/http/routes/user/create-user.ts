import { roleSchema } from '@witz/auth'
import { hash } from 'bcryptjs'
import { FastifyInstance } from 'fastify'
import { ZodTypeProvider } from 'fastify-type-provider-zod'
import { z } from 'zod'

import { prisma } from '@/lib/prisma'

import { BadRequestError } from '../_errors/bad-request-error'

export async function createUser(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().post(
    '/users',
    {
      schema: {
        tags: ['User'],
        summary: 'Create a new user',
        security: [{ bearerAuth: [] }],
        body: z.object({
          name: z.string(),
          email: z.string().email(),
          password: z.string().min(6),
          cpf: z.string().optional(),
          phone: z.string().optional(),
          birthDate: z.date().optional(),
          role: roleSchema
        }),
      },
    },
    async (request, reply) => {
      const { name, email, password, birthDate, cpf, phone, role } = request.body

      const userExists = await prisma.user.findFirst({
        where: {
          OR: [{ email }, { cpf }, { phone }],
        }})

      if (userExists) {
        throw new BadRequestError('Já existe um usuário com esses dados cadastrados.')
      }

      const passwordHash = await hash(password, 6)

      await prisma.user.create({
        data: {
          name,
          email,
          passwordHash,
          birthDate,
          cpf,
          phone,
          role
        },
      })
      return reply.status(201).send()
    },
  )
}
