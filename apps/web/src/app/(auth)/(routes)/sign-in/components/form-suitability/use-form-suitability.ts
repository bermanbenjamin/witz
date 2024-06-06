import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

const formSchema = z.object({
  name: z.string({message: 'Nome é obrigatório.'}).min(1, {
    message: 'Nome é obrigatório.'
  }),
  email: z.string({message: 'Email é obrigatório.'}).email({
    message: 'Email inválido.'
  })
})

type FormSuitabilityFormValues = z.infer<typeof formSchema>

export const useFormSuitability = () => {
  const form = useForm<FormSuitabilityFormValues>({
    resolver: zodResolver(formSchema),
  })

  const onSubmit = (values: FormSuitabilityFormValues) => console.log(values)
  
  return {form,onSubmit}
}
