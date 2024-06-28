'use client'

import { format } from 'date-fns'
import Link from 'next/link'

import { Icons } from '@/components/icons'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { appRoutes } from '@/lib/constants'
import { cn } from '@/lib/utils'

import { useFormSignUp } from './use-form-sign-up'

export default function FormSignUp() {
  const {
    form,
    onSubmit,
    isPending,
    data,
    showPassword,
    setShowPassword,
    cpfMask,
    phoneMask,
  } = useFormSignUp()

  return (
    <div className="max-w-[550px] w-full">
      <div className="space-y-2 text-center">
        <h1 className="text-xl font-semibold">Cadastra-se</h1>
        <span>Insira suas informações para criar sua conta.</span>
      </div>

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="gap-y-3 flex flex-col w-full mt-4"
        >
          {data?.success === false && data?.message && (
            <Alert variant="destructive">
              <Icons.alertTriangle className="size-4" />
              <AlertTitle>Erro ao realizar cadastro</AlertTitle>
              <AlertDescription>
                <p>{data.message}</p>
              </AlertDescription>
            </Alert>
          )}

          <FormField
            name="email"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl className="space-y-1">
                  <Input
                    {...field}
                    placeholder="email@gmail.com"
                    type="email"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <section className="grid grid-cols-2 gap-y-4 gap-x-6">
            <FormField
              name="name"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nome</FormLabel>
                  <FormControl className="space-y-1">
                    <Input {...field} placeholder="Nome Completo" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              name="cpf"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>CPF</FormLabel>
                  <FormControl className="space-y-1">
                    <Input
                      {...field}
                      ref={cpfMask}
                      placeholder="000.000.000-00"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              name="phone"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Celular</FormLabel>
                  <FormControl className="space-y-1">
                    <Input
                      {...field}
                      ref={phoneMask}
                      placeholder="(99) 99999-9999"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="birthDate"
              render={({ field }) => (
                <FormItem className="flex flex-col space-y-2">
                  <FormLabel className="pt-2">Data de Nascimento</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          type="button"
                          className={cn(
                            'pl-3 text-left font-normal bg-card hover:bg-card text-white',
                            !field.value && 'text-muted-foreground',
                          )}
                        >
                          {field.value ? (
                            format(field.value, 'dd/MM/yyyy')
                          ) : (
                            <span>Escolha uma data</span>
                          )}
                          <Icons.calendar className="ml-auto h-4 w-4 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={field.value}
                        onSelect={field.onChange}
                        disabled={(date) =>
                          date > new Date() || date < new Date('1930-01-01')
                        }
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              name="password"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex w-full items-center justify-between pr-2">
                    <span>Senha</span>
                    {showPassword ? (
                      <Icons.eye
                        className="size-4 cursor-pointer"
                        onClick={() => setShowPassword(false)}
                      />
                    ) : (
                      <Icons.eyeOff
                        className="size-4 cursor-pointer"
                        onClick={() => setShowPassword(true)}
                      />
                    )}
                  </FormLabel>
                  <FormControl className="space-y-1">
                    <Input
                      {...field}
                      placeholder="******"
                      type={showPassword ? 'text' : 'password'}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              name="password_confirmation"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex w-full items-center justify-between pr-2">
                    <span>Confirme sua senha</span>
                    {showPassword ? (
                      <Icons.eye
                        className="size-4 cursor-pointer"
                        onClick={() => setShowPassword(false)}
                      />
                    ) : (
                      <Icons.eyeOff
                        className="size-4 cursor-pointer"
                        onClick={() => setShowPassword(true)}
                      />
                    )}
                  </FormLabel>
                  <FormControl className="space-y-1">
                    <Input
                      {...field}
                      placeholder="******"
                      type={showPassword ? 'text' : 'password'}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </section>

          <Button
            variant="secondary"
            type="submit"
            className="w-full mt-4"
            disabled={isPending}
          >
            {isPending ? (
              <Icons.loader className="size-4 animate-spin" />
            ) : (
              'Acessar'
            )}
          </Button>
        </form>
      </Form>

      <div className="w-full text-center mt-4">
        <Button className="text-white" asChild variant="link">
          <Link href={appRoutes.signIn}>Voltar para o login</Link>
        </Button>
      </div>
    </div>
  )
}
