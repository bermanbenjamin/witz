import Link from 'next/link'

import { Icons } from '@/components/icons'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { appRoutes } from '@/lib/constants'

import { useFormSignIn } from './use-form-sign-in'

export default function FormSignIn() {
  const { handleSubmit, isPending, errors, success, message, showPassword, setShowPassword } = useFormSignIn()

  return (
    <div className='max-w-80 w-full'>
      <div className="space-y-2 text-center">
        <h1 className="text-xl font-semibold">Acessar Carteira</h1>
        <span>Insira suas informações para avançar</span>
      </div>

      <form
        onSubmit={handleSubmit}
        className="gap-y-3 flex flex-col w-full mt-4"
      >
        {success === false && message && (
          <Alert variant="destructive">
            <Icons.alertTriangle className="size-4" />
            <AlertTitle>Erro ao realizar login</AlertTitle>
            <AlertDescription>
              <p>{message}</p>
            </AlertDescription>
          </Alert>
        )}

        <div className="space-y-1">
          <Label htmlFor="email">Email</Label>
          <Input
            placeholder="email@gmail.com"
            name="email" type="email" id="email"
          />
          {errors?.email && (
            <p className="text-xs font-medium text-red-500 dark:text-red-400">
              {errors.email[0]}
            </p>
          )}
        </div>

        <div className="space-y-1">
          <div className="flex w-full items-center justify-between pr-2">
            <Label htmlFor="password">Senha</Label>
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
          </div>

          <Input
            placeholder="******"
            name="password"
            type={showPassword ? 'text' : 'password'}
            id="password"
          />
          {errors?.password && (
            <p className="text-xs font-medium text-red-500 dark:text-red-400">
              {errors.password[0]}
            </p>
          )}
        </div>

        <Link
          href="/auth/forgot-password"
          className="text-xs font-medium text-foreground hover:underline"
        >
          Esqueceu sua senha?
        </Link>

        <Button variant='secondary' type="submit" className='w-full mt-4' disabled={isPending}>{isPending ? (
          <Icons.loader className="size-4 animate-spin" />
        ) : (
          'Acessar'
        )}</Button>
      </form>

      <Button className='w-full mt-6' asChild><Link href={appRoutes.signUp}>Registrar-se</Link></Button>
    </div>
  )
}
