// pnpm prisma db seed

import { PrismaClient } from '@prisma/client'
import { hash } from 'bcryptjs'

const prisma = new PrismaClient()

async function seed() {
  await prisma.suitability.deleteMany()
  await prisma.answer.deleteMany()
  await prisma.user.deleteMany()

  const passwordHash = await hash('123456', 1)

   const suitability = await prisma.suitability.create({
      data: {
        score: 10,
      }
    })
    
    const [answer1, answer2] = await prisma.$transaction([
      prisma.answer.create({
        data: {
         questionId: 1,
         suitabilityId:  suitability.id,
        }
       }),
      prisma.answer.create({
        data: {
         questionId: 2,
         suitabilityId:  suitability.id,
        }
       }),
    ])

    await prisma.suitability.update({
      where: {
        id: suitability.id
      },
      data: {
        answers: {
          connect: [
            { id: answer1.id },
            { id: answer2.id },
          ]
        }
      }
    })

   await prisma.user.create({
    data: {
      name: 'John Doe',
      email: 'john@acme.com',
      passwordHash,
      suitabilities: {
        connect: {
          id: suitability.id
        }
      }
    },
  })
}

seed().then(() => {
  console.log('Database seeded!')
})