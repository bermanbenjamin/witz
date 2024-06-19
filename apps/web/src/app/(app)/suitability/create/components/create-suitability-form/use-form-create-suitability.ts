import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

const formSchema = z.record(z.string(), z.array(z.number()))


type CreateSuitabilityFormValues = z.infer<typeof formSchema>

export const useFormCreateSuitability = () => {
  const form = useForm<CreateSuitabilityFormValues>({
    resolver: zodResolver(formSchema),
  })

  const onSubmit = (values: CreateSuitabilityFormValues) => console.log(values)

  return { form, onSubmit }
}
