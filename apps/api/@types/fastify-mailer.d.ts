declare module 'fastify-mailer' {
  import { FastifyPluginCallback } from 'fastify'

  interface FastifyMailerOptions {
    defaults?: {
      from?: string
    }
    transport: {
      host: string
      port: number
      secure: boolean
      auth: {
        user: string
        pass: string
      }
    }
  }

  const fastifyMailer: FastifyPluginCallback<FastifyMailerOptions>

  export default fastifyMailer
}
