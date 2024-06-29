import { redirect } from 'next/navigation'
import { Suspense } from 'react'

import { auth } from '@/lib/auth'
import { appRoutes } from '@/lib/constants'

import FinishRegisterForm from './components/finish-register-form'
import SkeletonFinishRegister from './components/skeleton-finish-register'

export default async function FinishRegisterPage() {
  const { user: currentUser } = await auth()

  if (currentUser.role !== 'GUEST') redirect(appRoutes.home)

  return (
    <Suspense fallback={<SkeletonFinishRegister />}>
      <div className="flex items-center justify-center flex-col">
        <div className="space-y-2 text-center">
          <h1 className="text-xl font-semibold">Finalizar Cadastro</h1>
          <span>Insira suas informações para finalizar seu cadastro.</span>
        </div>
        <FinishRegisterForm currentUser={currentUser} />
      </div>
    </Suspense>
  )
}
