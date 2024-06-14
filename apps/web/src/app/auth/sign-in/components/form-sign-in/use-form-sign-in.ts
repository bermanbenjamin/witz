import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { toast } from 'sonner'

import { useFormState } from '@/hooks/use-form-state'
import { appRoutes } from '@/lib/constants'

import { signInWithEmailAndPassword } from '../../actions'

export const useFormSignIn = () => {
  const router = useRouter()
  const [showPassword, setShowPassword] = useState(false)

  const [{ errors, message, success }, handleSubmit, isPending] = useFormState(
    signInWithEmailAndPassword,
    () => {
      toast.success('Login efetuado com sucesso!')
      router.push(appRoutes.suitability)
    },
  )

  return {handleSubmit, isPending,errors, message, success,showPassword, setShowPassword}
}
