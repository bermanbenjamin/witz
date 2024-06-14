'use client'

import { useSearchParams } from 'next/navigation'

import FormSignIn from './components/form-sign-in'
import FormSuitability from './components/form-suitability'

const SignIn = () => {
  const searchParams = useSearchParams()

  const isSuitability = searchParams.get('to') === 'suitability'

  return (
    <>
      {isSuitability ? <FormSuitability />: <FormSignIn />}
      </>
  )
}

export default SignIn