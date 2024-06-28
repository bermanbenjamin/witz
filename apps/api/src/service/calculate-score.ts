import { questions, QuestionType } from '@/constants/question'

type Answer = {
  questionId: number
  choosedAlternativesId: number[]
}

export async function CalculateSuitabilityScore(
  answers: Answer[],
): Promise<number> {
  const totalWeight = answers.reduce((acc, answer) => {
    const question = questions.find(
      (question) => question.questionNumber === answer.questionId,
    )

    if (!question) {
      throw new Error(`Question ${answer.questionId} does not exist`)
    }

    const alternativeWeights = calculateChoosedAlternativeWeights(
      answer,
      question,
    )

    const questionWeight = alternativeWeights.reduce(
      (acc, weight) => acc + weight,
      0,
    )
    return acc + questionWeight
  }, 0)

  return totalWeight
}

function calculateChoosedAlternativeWeights(
  answer: Answer,
  question: QuestionType,
) {
  return answer.choosedAlternativesId.map((choosedAlternative) => {
    const alternative = question.alternatives.find(
      (alt) => alt.alternativeNumber === choosedAlternative,
    )

    if (!alternative) {
      throw new Error(
        `Alternative ${choosedAlternative} for question ${answer.questionId} does not exist`,
      )
    }

    return alternative.weight
  })
}
