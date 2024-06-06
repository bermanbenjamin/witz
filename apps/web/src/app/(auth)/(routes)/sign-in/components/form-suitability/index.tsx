import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { useFormSuitability } from './use-form-suitability'

const FormSuitability = () => {
  const { form, onSubmit } = useFormSuitability()

  return (
    <div className='max-w-80 w-full space-y-3'>
      <div className="space-y-2 text-center">
        <h1 className="text-xl font-semibold">Formulário Suitability</h1>
        <span>Insira suas informações para avançar</span>
      </div>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-3 w-full"
          >
<FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nome</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Nome Completo"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
<FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="email@gmail.com"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className='mt-4' />
              <Button variant='secondary' className='w-full'>Avançar</Button>
          </form>
        </Form>
    </div>
  )
}

export default FormSuitability