import fastifyCors from '@fastify/cors'
import { fastifyJwt } from '@fastify/jwt'
import fastifySwagger from '@fastify/swagger'
import fastifySwaggerUI from '@fastify/swagger-ui'
import { env } from '@witz/env'
import { fastify } from 'fastify'
import {
  jsonSchemaTransform,
  serializerCompiler,
  validatorCompiler,
  ZodTypeProvider,
} from 'fastify-type-provider-zod'

import { errorHandler } from './error-handler'
import { authenticateWithPassword } from './routes/auth/authenticate-with-password'
import { getProfile } from './routes/auth/get-profile'
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
  
app.register(fastifySwaggerUI, {
    routePrefix: '/docs',
  })

app.register(fastifyJwt, {
    secret: env.JWT_SECRET,
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
  

app.listen({ port: env.SERVER_PORT }).then(() => {
  console.log('Server is running on port 3333')
  console.log(app.printRoutes());
})
