'use client'

import type { SuitabilityDTO } from '@witz/api/src/models/suitability'
import { useRouter } from 'next/navigation'

import { Icons } from '@/components/icons'
import { Button } from '@/components/ui/button'
import { appRoutes } from '@/lib/constants'

interface CreateSuitabilityButtonProps {
  suitabilities: SuitabilityDTO[]
}

export default function CreateSuitabilityButton({
  suitabilities,
}: CreateSuitabilityButtonProps) {
  const router = useRouter()

  const hasSuitabilityCurrentYear = suitabilities.some((suitability) => {
    const year = new Date(suitability.createdAt).getFullYear()
    return year === new Date().getFullYear()
  })

  return (
    <Button
      onClick={() => router.push(appRoutes.createSuitability)}
      className="flex items-center gap-x-2"
    >
      <Icons.update className="w-4 h-4" />
      {hasSuitabilityCurrentYear
        ? 'Refazer questionário'
        : 'Responder questionário'}
    </Button>
  )
}
