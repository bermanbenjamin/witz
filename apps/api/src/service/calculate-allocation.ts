import { investorAllocations, Portfolio } from '@/constants/investor-profile-allocation'

type Answer = {
  investorProfile: string
  investorType: string
  totalValue: number
  imutableValue: number
  fiiValue: number
  dailyLiquityValue: number
  internationalValue: number
}

export async function CalculateScore(answer: Answer): Promise<number> {
  const { totalValue, fiiValue, dailyLiquityValue, internationalValue, imutableValue } = answer;
  const score = totalValue - fiiValue - dailyLiquityValue - internationalValue - imutableValue;
  return score;
}


export async function CalculateAllocation(score: number, investorProfile: string, investorType: string): Promise<Portfolio[]> {

  const allocation = investorAllocations.find(
    (allocation) => 
      allocation.investorProfile === investorProfile &&
      allocation.investorType === investorType &&
      allocation.minRange <= score &&
      (allocation.maxRange == null || allocation.maxRange.valueOf() >= score)
  );

  if (!allocation) {
    throw new Error(`Allocation does not exist`)
  }

  return allocation.portfolios
}