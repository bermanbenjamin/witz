import { zodResolver } from '@hookform/resolvers/zod'
import { useMask } from '@react-input/mask'
import { useMutation } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { z } from 'zod'

import { appRoutes } from '@/lib/constants'

import { signUpAction, signUpSchema } from '../../actions'

type SignUpFormValues = z.infer<typeof signUpSchema>

export function useFormSignUp() {
  const router = useRouter()

  const form = useForm<SignUpFormValues>({
    resolver: zodResolver(signUpSchema),
  })

  const [showPassword, setShowPassword] = useState(false)

  const cpfMask = useMask({ mask: '999.999.999-99', replacement: { 9: /\d/ } });
  const phoneMask = useMask({ mask: '(__) 9____-____', replacement: { _: /\d/ } });

  const { mutate: createUser, data, isPending } = useMutation({
    mutationKey: ['signUp'],
    mutationFn: signUpAction,
    onSuccess: () => {
      toast.success('Cadastro efetuado com sucesso!')
      router.push(appRoutes.signIn)
    },
  })
  
  function onSubmit(values: SignUpFormValues) {
    const formattedValues = {
      ...values,
      phone: values.phone.replace(/\D/g, ''),
      cpf: values.cpf.replace(/\D/g, ''),
      }

    createUser(formattedValues)
  }
  
  return { 
    form,
    onSubmit,
    isPending,
    data,
    showPassword,
    setShowPassword,
    phoneMask,
    cpfMask
   }
}
