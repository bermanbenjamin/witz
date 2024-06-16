import { toast } from 'sonner'

import { useFormState } from '@/hooks/use-form-state'

import { signInWithMagicLinkAction } from './actions'

export const useFormMagicLink = () => {

  const [{ errors, message, success }, handleSubmit, isPending] = useFormState(
    signInWithMagicLinkAction,
    () => {
      setTimeout(() => {
        toast.success('Email enviado com sucesso!')
      }, 5000)
    },
  )

  return { handleSubmit, isPending, errors, message, success }
}
