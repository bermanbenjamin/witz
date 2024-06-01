import { FastifyInstance } from 'fastify'
import { ZodTypeProvider } from 'fastify-type-provider-zod'
import { z } from 'zod'

import { auth } from '@/http/middlewares/auth'
import { prisma } from '@/lib/prisma'
import { noContentSchema } from '@/schemas/base-schema'
import { getUserPermissions } from '@/utils/get-user-permissions'

import { MethodNotAllowedError } from '../_errors/method-not-allowed-error'

export async function deleteSuitabilityById(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().register(auth).delete(
    '/suitability/:suitabilityId', 
    {
      schema: {
        tags: ['Suitability'],
        description: 'Delete a suitability by identifier',
        params: z.object({
            suitabilityId: z.string(),
        }),
        response: {
            204: noContentSchema
        }
      },
    }, 
    async (request, reply) => {
        const { suitabilityId } = request.params
        const { sub: userId, role } = await request.getCurrentUserProps()

        const { cannot } = getUserPermissions(userId, role)

        if(cannot('delete', 'Suitability')){
            throw new MethodNotAllowedError(`You're not allowed to delete this suitability.`)
        }

        await prisma.suitability.delete({
            where: {
                id: suitabilityId
            }
        })

        return reply.status(204).send()
    }
)
}