import { prisma } from '@/lib/prisma'

type Answer = {
  questionId: number
  choosedAlternativeId: number
}

export async function CalculateSuitabilityScore(
  answers: Answer[]
): Promise<number> {
  const questions = await prisma.question.findMany({
    include: {
      questionAlternatives: true,
    },
  })

  const totalWeight = answers.reduce((acc, answer) => {
    const question = questions.find(
      (question) => question.id === answer.questionId
    )
    const alternative = question?.questionAlternatives.find(
      (alt) => alt.id === answer.choosedAlternativeId
    )

    if (question && alternative) {
      acc += alternative.weight
    }

    return acc
  }, 0)

  return totalWeight
}
