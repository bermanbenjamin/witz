type Alternative = {
  alternativeNumber: number
  text: string
  weight: number
}

export type QuestionType = {
  questionNumber: number
  name: string
  isMultipleChoices: boolean
  alternatives: Alternative[]
}

export const questions: QuestionType[] = [
  {
    questionNumber: 1,
    name: 'Qual seu nível de formação acadêmica?',
    isMultipleChoices: false,
    alternatives: [
      { alternativeNumber: 1, text: 'Ensino fundamental', weight: 0 },
      { alternativeNumber: 2, text: 'Ensino médio', weight: 5 },
      { alternativeNumber: 3, text: 'Ensino superior', weight: 10 },
      {
        alternativeNumber: 4,
        text: 'Pós-graduação, mestrado ou doutorado',
        weight: 20,
      },
    ],
  },
  {
    questionNumber: 2,
    name: 'Como você avalia sua experiência com investimentos/mercado financeiro?',
    isMultipleChoices: false,
    alternatives: [
      {
        alternativeNumber: 1,
        text: 'Tenho pouca ou nenhuma experiência com investimentos',
        weight: 0,
      },
      {
        alternativeNumber: 2,
        text: 'Tenho alguma experiência com investimentos',
        weight: 10,
      },
      {
        alternativeNumber: 3,
        text: 'Tenho muita experiência com investimentos',
        weight: 20,
      },
    ],
  },
  {
    questionNumber: 3,
    name: 'Em qual perfil de retorno e risco esperados você melhor se encaixa?',
    isMultipleChoices: false,
    alternatives: [
      {
        alternativeNumber: 1,
        text: 'Prefiro evitar riscos e estou disposto a aceitar retornos menores para garantir a segurança do meu capital',
        weight: 0,
      },
      {
        alternativeNumber: 2,
        text: 'Estou disposto a assumir riscos limitados para potencialmente aumentar meus retornos, mas prefiro abordagens mais conservadoras.',
        weight: 50,
      },
      {
        alternativeNumber: 3,
        text: 'Estou confortável com um nível equilibrado de risco para alcançar retornos razoáveis e estou disposto a ver alguma flutuação no valor do meu investimento',
        weight: 100,
      },
      {
        alternativeNumber: 4,
        text: 'Estou disposto a assumir riscos significativos para buscar retornos mais altos, aceitando que isso pode incluir grandes flutuações no valor do meu investimento',
        weight: 200,
      },
      {
        alternativeNumber: 5,
        text: 'Estou totalmente confortável em assumir riscos elevados, inclusive a possibilidade de perder grande parte do meu capital, em busca dos maiores retornos possíveis',
        weight: 400,
      },
    ],
  },
  {
    questionNumber: 4,
    name: 'Qual a perda máxima tolerada em um período de 1 (um) ano?',
    isMultipleChoices: false,
    alternatives: [
      {
        alternativeNumber: 1,
        text: 'Não há tolerância para perdas anuais',
        weight: 0,
      },
      { alternativeNumber: 2, text: 'Até 5%', weight: 50 },
      { alternativeNumber: 3, text: 'Até 10%', weight: 100 },
      { alternativeNumber: 4, text: 'Até 15%', weight: 200 },
      { alternativeNumber: 5, text: 'Acima de 15%', weight: 400 },
    ],
  },
  {
    questionNumber: 5,
    name: 'Você possui familiaridade ou já realizou investimentos de algum desses tipos no passado? *Marque todas as opções que se aplicam',
    isMultipleChoices: true,
    alternatives: [
      { alternativeNumber: 1, text: 'Poupança', weight: 0 },
      {
        alternativeNumber: 2,
        text: 'Renda fixa (Títulos Públicos, CDBs, Debêntures, etc)',
        weight: 5,
      },
      {
        alternativeNumber: 3,
        text: 'Fundos de investimento tradicionais (FIDC, FII, FIA, FIP, FIC, etc)',
        weight: 5,
      },
      { alternativeNumber: 4, text: 'Previdência privada', weight: 5 },
      {
        alternativeNumber: 5,
        text: 'Renda variável (Ações e ETFs)',
        weight: 10,
      },
      {
        alternativeNumber: 6,
        text: 'Derivativos (opções, futuros, termos)',
        weight: 50,
      },
      { alternativeNumber: 7, text: 'Ativos no exterior', weight: 10 },
      {
        alternativeNumber: 8,
        text: 'Criptoativos (criptomoedas, NFT, entre outros)',
        weight: 50,
      },
      {
        alternativeNumber: 9,
        text: 'Investimentos alternativos (private equity, venture capital, special situations, etc)',
        weight: 50,
      },
    ],
  },
  {
    questionNumber: 6,
    name: 'Qual volume você investiu nos últimos 12 meses?',
    isMultipleChoices: false,
    alternatives: [
      {
        alternativeNumber: 1,
        text: 'Inferior a R$ 50.000,00 (cinquenta mil reais)',
        weight: 0,
      },
      {
        alternativeNumber: 2,
        text: 'Entre R$ 50.000,00 (cinquenta mil reais) e R$ 300.000,00 (trezentos mil reais)',
        weight: 0,
      },
      {
        alternativeNumber: 3,
        text: 'Superior a R$ 300.000,00 (trezentos mil reais)',
        weight: 0,
      },
    ],
  },
  {
    questionNumber: 7,
    name: 'Qual o seu horizonte aproximado de tempo para esta carteira de investimento?',
    isMultipleChoices: false,
    alternatives: [
      { alternativeNumber: 1, text: 'Até 1 ano', weight: 0 },
      { alternativeNumber: 2, text: 'De 1 ano a 3 anos', weight: 5 },
      { alternativeNumber: 3, text: 'De 3 anos a 5 anos', weight: 10 },
      { alternativeNumber: 4, text: 'Mais de 5 anos', weight: 20 },
    ],
  },
  {
    questionNumber: 8,
    name: 'Como você reage às oscilações do mercado financeiro?',
    isMultipleChoices: false,
    alternatives: [
      {
        alternativeNumber: 1,
        text: 'Fico tranquilo e aproveito as oportunidades',
        weight: 400,
      },
      {
        alternativeNumber: 2,
        text: 'Fico um pouco preocupado, mas mantenho a calma',
        weight: 100,
      },
      {
        alternativeNumber: 3,
        text: 'Fico muito nervoso e quero vender tudo',
        weight: 0,
      },
    ],
  },
  {
    questionNumber: 9,
    name: 'Qual a probabilidade de algum desembolso extraordinário relevante dos recursos alocados nessa carteira nos próximos 5 anos?',
    isMultipleChoices: false,
    alternatives: [
      { alternativeNumber: 1, text: 'Alta', weight: 0 },
      { alternativeNumber: 2, text: 'Média', weight: 5 },
      { alternativeNumber: 3, text: 'Baixa', weight: 10 },
      { alternativeNumber: 4, text: 'Nenhuma', weight: 20 },
    ],
  },
  {
    questionNumber: 10,
    name: 'Qual faixa de valor corresponde à sua renda mensal?',
    isMultipleChoices: false,
    alternatives: [
      { alternativeNumber: 1, text: 'Até R$ 10.000', weight: 0 },
      { alternativeNumber: 2, text: 'De R$ 10.000 até R$ 20.000', weight: 0 },
      { alternativeNumber: 3, text: 'De R$ 20.000 até R$ 50.000', weight: 10 },
      { alternativeNumber: 4, text: 'Acima de R$ 50.000,00', weight: 100 },
    ],
  },
  {
    questionNumber: 11,
    name: 'Selecione quais ativos que compõem seu patrimônio total atual',
    isMultipleChoices: false,
    alternatives: [
      { alternativeNumber: 1, text: 'Poupança', weight: 0 },
      {
        alternativeNumber: 2,
        text: 'Renda fixa (Títulos Públicos, CDBs, Debêntures, etc)',
        weight: 10,
      },
      {
        alternativeNumber: 3,
        text: 'Fundos de investimento tradicionais (FIDC, FII, FIA, FIP, FIC, etc)',
        weight: 50,
      },
      { alternativeNumber: 4, text: 'Previdência privada', weight: 10 },
      {
        alternativeNumber: 5,
        text: 'Renda variável (Ações e ETFs)',
        weight: 100,
      },
      {
        alternativeNumber: 6,
        text: 'Derivativos (opções, futuros, termos)',
        weight: 400,
      },
      { alternativeNumber: 7, text: 'Ativos no exterior', weight: 50 },
      {
        alternativeNumber: 8,
        text: 'Criptoativos (criptomoedas, NFT, entre outros)',
        weight: 400,
      },
      {
        alternativeNumber: 9,
        text: 'Investimentos alternativos (private equity, venture capital, special situations, etc)',
        weight: 400,
      },
    ],
  },
  {
    questionNumber: 12,
    name: 'Qual faixa de valor corresponde ao seu patrimônio?',
    isMultipleChoices: false,
    alternatives: [
      { alternativeNumber: 1, text: 'Até R$ 300.000,00', weight: 0 },
      {
        alternativeNumber: 2,
        text: 'De R$ 300.000,00 até R$ 1.000.000,00',
        weight: 0,
      },
      {
        alternativeNumber: 3,
        text: 'De R$ 1.000.000,00 até R$ 5.000.000,00',
        weight: 0,
      },
      {
        alternativeNumber: 4,
        text: 'De R$ 5.000.000,00 até R$ 15.000.000,00',
        weight: 0,
      },
      { alternativeNumber: 5, text: 'Acima de R$ 15.000.000,00', weight: 0 },
    ],
  },
]
