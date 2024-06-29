'use client'
import { useGetProfile } from '@/hooks/user/use-get-profile'

import SuitabilityCard from './suitability-card'

export default function SuitabilityHistory() {
  const { data: currentUser } = useGetProfile()

  return (
    <div className="grid grid-cols-5 gap-x-10">
      {currentUser?.suitabilities === undefined ||
        (currentUser?.suitabilities.length === 0 && (
          <span className="text-muted-foreground font-semibold">
            Sem histórico suitability ainda.
          </span>
        ))}
      {currentUser?.suitabilities &&
        currentUser.suitabilities.length > 0 &&
        currentUser.suitabilities.map((suitability) => (
          <SuitabilityCard
            key={suitability.id}
            createdAt={suitability.createdAt}
          />
        ))}
    </div>
  )
}
