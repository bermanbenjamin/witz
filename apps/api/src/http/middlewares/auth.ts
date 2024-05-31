import type { FastifyInstance } from 'fastify'
import { fastifyPlugin } from 'fastify-plugin'

import type { UserJwt } from '@/models/user-jwt'

import { UnauthorizedError } from '../routes/_errors/unauthorized-error'

export const auth = fastifyPlugin(async (app: FastifyInstance) => {
  app.addHook('preHandler', async (request) => {
    request.getCurrentUserProps = async () => {
      try {
        const { sub, role } = await request.jwtVerify<UserJwt>()

        return { sub, role }
      } catch {
        throw new UnauthorizedError('Invalid auth token')
      }
    }
  })
})
