import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

const formSchema = z.object({
  email: z.string({message: 'Email é obrigatório.'}).email({
    message: 'Email inválido.'
  }),
  password: z.string({message: 'Senha é obrigatória.'}).min(6, {
    message: 'Senha deve ter no mínimo 6 caracteres.'
  })
})

type FormSignInFormValues = z.infer<typeof formSchema>

export const useFormSignIn = () => {
  const form = useForm<FormSignInFormValues>({
    resolver: zodResolver(formSchema),
  })

  const onSubmit = (values: FormSignInFormValues) => console.log(values)
  
  return {form,onSubmit}
}
