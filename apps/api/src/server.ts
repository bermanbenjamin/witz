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

import { errorHandler } from './http/error-handler'
import { authenticateWithPassword } from './http/routes/auth/authenticate-with-password'
import { getProfile } from './http/routes/auth/get-profile'
import { magicLinkLogin } from './http/routes/auth/magic-link-login'
import { magicLinkVerify } from './http/routes/auth/magic-link-verify'
import { createSuitability } from './http/routes/suitability/create-suitability'
import { deleteSuitabilityById } from './http/routes/suitability/delete-suitability'
import { getSuitabilityById } from './http/routes/suitability/get-suitability-by-id'
import { createUser } from './http/routes/user/create-user'
import { deleteUserById } from './http/routes/user/delete-user-by-id'
import { getAllSuitabilitiesByUserId } from './http/routes/user/get-all-user-suitabilities'
import { getAllUsers } from './http/routes/user/get-all-users'
import { updateUserById } from './http/routes/user/update-user'

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

// Auth
app.register(authenticateWithPassword)
app.register(getProfile)

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
