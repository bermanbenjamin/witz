'use client'
import { Badge } from '@/components/ui/badge'
import { useGetProfile } from '@/hooks/user/use-get-profile'
import { parseProfileType } from '@/lib/utils'

export default function HeaderUsername() {
  const { data: currentUser } = useGetProfile()

  return (
    <>
      <span className="text-sm">{currentUser?.name}</span>
      {currentUser?.profileType && (
        <Badge variant="custom" className="text-xs">
          {parseProfileType(currentUser?.profileType)}
        </Badge>
      )}
    </>
  )
}
