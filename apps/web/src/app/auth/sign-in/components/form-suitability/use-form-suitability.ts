import { toast } from 'sonner'

import { useFormState } from '@/hooks/use-form-state'

import { signInWithMagicLinkAction } from '../../actions'

export function useFormSuitability() {
  const [{ errors, message, success }, handleSubmit, isPending] = useFormState(
    signInWithMagicLinkAction,
    () => {
      toast.success('Email enviado com sucesso!')
    },
  )
  
  return { errors, message, success, handleSubmit, isPending }
}
