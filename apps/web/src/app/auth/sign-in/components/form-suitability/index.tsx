import Link from 'next/link'

import { Icons } from '@/components/icons'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { appRoutes } from '@/lib/constants'

import { useFormSuitability } from './use-form-suitability'

export default function FormSuitability() {
  const { handleSubmit, isPending, errors, success, message } =
    useFormSuitability()

  return (
    <div className="max-w-80 w-full space-y-3">
      <div className="space-y-2 text-center">
        <h1 className="text-xl font-semibold">Formulário Suitability</h1>
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
          <Label htmlFor="name">Nome</Label>
          <Input
            placeholder="Nome Completo"
            name="name"
            type="text"
            id="name"
          />
          {errors?.name && (
            <p className="text-xs font-medium text-red-500 dark:text-red-400">
              {errors.name[0]}
            </p>
          )}
        </div>

        <div className="space-y-1">
          <Label htmlFor="email">Email</Label>
          <Input
            placeholder="email@gmail.com"
            name="email"
            type="email"
            id="email"
          />
          {errors?.email && (
            <p className="text-xs font-medium text-red-500 dark:text-red-400">
              {errors.email[0]}
            </p>
          )}
        </div>

        <Button
          variant="secondary"
          type="submit"
          className="w-full mt-4"
          disabled={isPending}
        >
          {isPending ? (
            <Icons.loader className="size-4 animate-spin" />
          ) : (
            'Avançar'
          )}
        </Button>
      </form>
      <Button className="w-full mt-6 text-white" variant="link" asChild>
        <Link href={appRoutes.signIn}>Acessar modo membro</Link>
      </Button>
      {success === true && (
        <Alert variant="success">
          <Icons.doubleCheck className="size-4" />
          <AlertTitle>E-mail enviado!</AlertTitle>
          <AlertDescription>
            <p>
              Verifique sua caixa de e-mail e clique no link para realizar o seu
              login.
            </p>
          </AlertDescription>
        </Alert>
      )}
    </div>
  )
}
