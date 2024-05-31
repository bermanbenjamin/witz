import 'fastify'

import type { UserJwt } from '@/models/user-jwt'

declare module 'fastify' {
  export interface FastifyRequest {
    getCurrentUserProps(): Promise<UserJwt>
  }
}
