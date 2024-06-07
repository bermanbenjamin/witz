import Link from 'next/link'

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

import { useFormSignIn } from './use-form-sign-in'

const FormSignIn = () => {
  const { form, onSubmit } = useFormSignIn()

  return (
    <div className='max-w-80 w-full'>
      <div className="space-y-2 text-center">
        <h1 className="text-xl font-semibold">Acessar Carteira</h1>
        <span>Insira suas informações para avançar</span>
      </div>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="gap-y-3 flex flex-col w-full mt-4"
          >
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
<FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Senha</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="******"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
          <Link href='' className='underline font-medium text-sm'>Esqueceu sua senha?</Link>

              <Button variant='secondary' className='w-full mt-4'>Acessar</Button>
          </form>
        </Form>

          <Button className='w-full mt-6'>Registrar-se</Button>
    </div>
  )
}

export default FormSignIn