import { zodResolver } from '@hookform/resolvers/zod'
import { useMask } from '@react-input/mask'
import { useMutation } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { z } from 'zod'

import { appRoutes } from '@/lib/constants'

import { signUpAction } from '../../actions'

export const signUpSchema = z
  .object({
    email: z
      .string({ required_error: 'Por favor, informe seu endereço de e-mail.' })
      .email({ message: 'Por favor, informe seu endereço de e-mail.' }),
    name: z.string().refine((value) => value.split(' ').length > 1, {
      message: 'Por favor, informe seu nome completo.',
    }),
    password: z
      .string({ required_error: 'Senha é obrigatória' })
      .min(6, { message: 'Senha deve conter ao menos 6 caracteres' }),
    password_confirmation: z
      .string({ required_error: 'Senha é obrigatória' })
      .min(6, { message: 'Senha deve conter ao menos 6 caracteres' }),
    cpf: z.string({ message: 'Por favor, informe seu CPF.' }),
    phone: z
      .string({ message: 'Por favor, informe seu número.' })
      .length(15, { message: 'Por favor, informe um número correto.' }),
    birthDate: z.date({
      required_error: 'Por favor, informe sua data de nascimento.',
    }),
  })
  .refine((data) => data.password === data.password_confirmation, {
    message: 'As senhas não coincidem.',
    path: ['password_confirmation'],
  })

type SignUpFormValues = z.infer<typeof signUpSchema>

export function useFormSignUp() {
  const router = useRouter()

  const form = useForm<SignUpFormValues>({
    resolver: zodResolver(signUpSchema),
  })

  const [showPassword, setShowPassword] = useState(false)

  const cpfMask = useMask({ mask: '___.___.___-__', replacement: { _: /\d/ } })
  const phoneMask = useMask({
    mask: '(__) 9____-____',
    replacement: { _: /\d/ },
  })

  const {
    mutate: createUser,
    data,
    isPending,
  } = useMutation({
    mutationKey: ['signUp'],
    mutationFn: signUpAction,
    onSuccess: (data) => {
      if (data.success) {
        toast.success('Cadastro efetuado com sucesso!')
        router.push(appRoutes.signIn)
      }
    },
  })

  function onSubmit(values: SignUpFormValues) {
    const formattedValues: SignUpFormValues = {
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
    cpfMask,
  }
}
