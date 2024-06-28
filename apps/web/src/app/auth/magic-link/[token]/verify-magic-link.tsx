'use client'

import { useQuery } from '@tanstack/react-query'

import { Icons } from '@/components/icons'

import { signInWithMagicLinkVerifierAction } from './actions'

interface VerifyMagiclinkProps {
  secret: string
}

export default function VerifyMagiclink({ secret }: VerifyMagiclinkProps) {
  const { data, isLoading } = useQuery({
    queryKey: ['verify-magic-link'],
    queryFn: async () => await signInWithMagicLinkVerifierAction(secret),
  })

  if (isLoading) {
    return (
      <div className="flex items-center gap-x-2">
        <Icons.loader className="animate-spin" />
        <h1 className="text-lg">Verificando token de login...</h1>
      </div>
    )
  }

  if (data?.success === false && data.message) {
    return <span className="text-red-500">{data.message}</span>
  }

  return (
    <div className="border-solid border border-primary rounded-full size-12 flex items-center justify-center">
      <Icons.doubleCheck className="text-primary" />
    </div>
  )
}
