'use client'

import Image from 'next/image'
import { useSearchParams } from 'next/navigation'

import logoGreen from '@/assets/logo-green.svg'

import FormSignIn from './components/form-sign-in'
import FormSuitability from './components/form-suitability'

const SignIn = () => {
  const searchParams = useSearchParams()

  const isSuitability = searchParams.get('to') === 'suitability'

  return (
    <main className="grid h-screen w-screen grid-cols-2">
      <aside className="flex flex-col items-center justify-center gap-y-6 bg-card-foreground">
        <Image
          src={logoGreen}
          alt="logo-green"
          width={1000}
          height={1000}
          className="max-h-20 max-w-96"
        />
        <span className="max-w-96 text-center text-primary">
          Livres de qualquer amarra com instituições financeiras ou comissões por ativos
          específicos.
        </span>
      </aside>
      <section className="flex flex-col items-center justify-center">
      {isSuitability ? <FormSuitability />: <FormSignIn />}
      </section>
    </main>
  )
}

export default SignIn