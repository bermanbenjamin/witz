import fastifyCors from '@fastify/cors'
import { fastifyJwt } from '@fastify/jwt'
import fastifySwagger from '@fastify/swagger'
import fastifySwaggerUI from '@fastify/swagger-ui'
import { env } from '@witz/env'
import { fastify } from 'fastify'
import fastifyMailer from 'fastify-mailer'
import {
  jsonSchemaTransform,
  serializerCompiler,
  validatorCompiler,
  ZodTypeProvider,
} from 'fastify-type-provider-zod'

import { errorHandler } from './error-handler'
import { authenticateWithPassword } from './routes/auth/authenticate-with-password'
import { magicLinkLogin } from './routes/auth/magic-link-login'
import { magicLinkVerify } from './routes/auth/magic-link-verify'
import { createSuitability } from './routes/suitability/create-suitability'
import { deleteSuitabilityById } from './routes/suitability/delete-suitability'
import { getSuitabilityById } from './routes/suitability/get-suitability-by-id'
import { createUser } from './routes/user/create-user'
import { deleteUserById } from './routes/user/delete-user-by-id'
import { getAllSuitabilitiesByUserId } from './routes/user/get-all-user-suitabilities'
import { getAllUsers } from './routes/user/get-all-users'
import { updateUserById } from './routes/user/update-user'

const app = fastify().withTypeProvider<ZodTypeProvider>()

app.setSerializerCompiler(serializerCompiler)
app.setValidatorCompiler(validatorCompiler)

app.setErrorHandler(errorHandler)

app.register(fastifySwagger, {
    openapi: {
      info: {
        title: 'Witz',
        description: 'Platform to control your investments.',
        version: '1.0.0',
      },
      components: {
        securitySchemes: {
          bearerAuth: {
            type: 'http',
            scheme: 'bearer',
            bearerFormat: 'JWT',
          },
        },
      },
    },
    transform: jsonSchemaTransform,
  })

  app.register(fastifyMailer, {
    defaults: { from: 'Witz Wealt | Magic Link <delivered@resend.dev>' },
    transport: {
      host: 'smtp.resend.com',
      port: 465,
      secure: true, // use TLS
      auth: {
        user: 'resend',
        pass: env.RESEND_TOKEN
      }
    }
  })
  
app.register(fastifySwaggerUI, {
    routePrefix: '/docs',
  })

app.register(fastifyJwt, {
    secret: env.JWT_SECRET,
    decode: { complete: true },
  })
  
app.register(fastifyCors)
  
app.register(authenticateWithPassword)
app.register(createUser)
app.register(createSuitability)
app.register(getAllSuitabilitiesByUserId)
app.register(getAllUsers)
app.register(deleteSuitabilityById)
app.register(deleteUserById)
app.register(getSuitabilityById)
app.register(updateUserById)
app.register(magicLinkLogin)
app.register(magicLinkVerify)
  

app.listen({ port: env.SERVER_PORT }).then(() => {
  console.log('Server is running on port 3333')
  console.log(app.printRoutes());
})
