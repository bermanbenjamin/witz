import fastifyCors from '@fastify/cors'
import fastifySwagger from '@fastify/swagger'
import fastifySwaggerUI from '@fastify/swagger-ui'
import { fastify } from 'fastify'
import {
  jsonSchemaTransform,
  serializerCompiler,
  validatorCompiler,
  ZodTypeProvider,
} from 'fastify-type-provider-zod'

import { createSuitability } from './routes/suitability/create-suitability'
import { createAccount } from './routes/user/create-account'
import { getAllSuitabilitiesByUserId } from './routes/user/get-all-user-suitabilities'

const app = fastify().withTypeProvider<ZodTypeProvider>()

app.setSerializerCompiler(serializerCompiler)
app.setValidatorCompiler(validatorCompiler)

  app.register(fastifySwagger, {
    openapi: {
      info: {
        title: 'Witz',
        description: 'Platform to control your investments.',
        version: '1.0.0',
      },
      servers: [],
    },
    transform: jsonSchemaTransform,
  })
  
  app.register(fastifySwaggerUI, {
    routePrefix: '/docs',
  })
  
  app.register(fastifyCors)
  
  app.register(createAccount)
  app.register(createSuitability)
  app.register(getAllSuitabilitiesByUserId)
  

app.listen({ port: 3333 }).then(() => {
  console.log('Server is running on port 3333')
  console.log(app.printRoutes());
})
