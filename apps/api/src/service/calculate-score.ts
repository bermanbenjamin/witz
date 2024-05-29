import { questions } from '@/constants/question'

type Answer = {
  questionId: number
  choosedAlternativeId: number
}

export async function CalculateSuitabilityScore(
  answers: Answer[]
): Promise<number> {
  const totalWeight = answers.reduce((acc, answer) => {
    const question = questions.find(
      (question) => question.questionNumber === answer.questionId
    )

    if (question === undefined) {
      throw new Error(`Question ${answer.questionId} does not exist`)
    }

    const alternative = question.alternatives.find(
      (alternative) =>
        alternative.alternativeNumber === answer.choosedAlternativeId
    )

    if (!alternative) {
      throw new Error(
        `Alternative ${answer.choosedAlternativeId} does not exist`
      )
    }

    if (question && alternative) {
      acc += alternative.weight
    }

    return acc
  }, 0)

  return totalWeight
}
