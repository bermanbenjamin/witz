'use client'

import { useSearchParams } from 'next/navigation'

import FormSignIn from './components/form-sign-in'
import FormSuitability from './components/form-suitability'

export default function SignInPage() {
  const searchParams = useSearchParams()

  const isSuitability = searchParams.get('to') === 'suitability'

  return (
    <>
      {isSuitability ? <FormSuitability />: <FormSignIn />}
      </>
  )
}
