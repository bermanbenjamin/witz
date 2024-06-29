'use client'

import { Badge } from '@/components/ui/badge'
import { useGetProfile } from '@/hooks/user/use-get-profile'
import { parseProfileType } from '@/lib/utils'

import CreateSuitabilityButton from './create-suitability-button'

export default function SuitabilityHeader() {
  const { data: currentUser } = useGetProfile()

  return (
    <>
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-6">
          <h1 className="font-semibold text-3xl">Suitability</h1>
          {currentUser?.profileType && (
            <Badge variant="custom">
              {parseProfileType(currentUser?.profileType)}
            </Badge>
          )}
        </div>
        <CreateSuitabilityButton suitabilities={currentUser?.suitabilities} />
      </div>
    </>
  )
}
