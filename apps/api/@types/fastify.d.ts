import 'fastify'

import { Transporter } from 'nodemailer'

import type { UserJwt } from '@/models/user-jwt'

declare module 'fastify' {
  interface FastifyInstance {
    mailer: Transporter
  }

  export interface FastifyRequest {
    getCurrentUserProps(): Promise<UserJwt>
  }
}
