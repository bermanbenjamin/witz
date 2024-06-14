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

export async function CalculateAllocation(answer: Answer): Promise<Portfolio[]> {

    const nc = answer.totalValue - answer.fiiValue - answer.dailyLiquityValue - answer.internationalValue - answer.imutableValue

    const allocation = investorAllocations.find(
      (allocation) => 
        allocation.investorProfile === answer.investorProfile &&
        allocation.investorType === answer.investorType &&
        allocation.minRange <= nc &&
        (allocation.maxRange == null || allocation.maxRange.valueOf() >= nc)
    );

    if (!allocation) {
      throw new Error(`Allocation does not exist`)
    }

    return allocation.portfolios
}