type Question = {
  questionNumber: number
  name: string
  alternative: Alternative[]
}

type Alternative = {
  alternativeNumber: number
  text: string
  weight: number
}

const questions: Question[] = [
  {
    questionNumber: 1,
    name: 'Quanto de capital voce quer alocar',
    alternative: [
      { alternativeNumber: 1, text: '200 mil reais', weight: 1 },
      { alternativeNumber: 1, text: '200 mil reais', weight: 1 },
      { alternativeNumber: 1, text: '200 mil reais', weight: 1 },
      { alternativeNumber: 1, text: '200 mil reais', weight: 1 },
    ],
  },
  {
    questionNumber: 2,
    name: 'Quanto de capital voce quer alocar',
    alternative: [{ alternativeNumber: 1, text: '200 mil reais', weight: 1 }],
  },
  {
    questionNumber: 3,
    name: 'Quanto de capital voce quer alocar',
    alternative: [{ alternativeNumber: 1, text: '200 mil reais', weight: 1 }],
  },
  {
    questionNumber: 4,
    name: 'Quanto de capital voce quer alocar',
    alternative: [{ alternativeNumber: 1, text: '200 mil reais', weight: 1 }],
  },
]
