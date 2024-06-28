import { api } from '../api-client'

export interface CreateSuitabilityRequest {
  questions: {
    questionId: number
    choosedAlternativesId: number[]
  }[]
}

export async function createSuitabilityService({
  questions,
}: CreateSuitabilityRequest) {
  const result = await api.post('suitabilities', {
    json: {
      questions,
    },
  })

  return result
}
