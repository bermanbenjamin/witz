'use client'

import { Icons } from '@/components/icons'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

import { useFormMagicLink } from './use-form-magic-link'


const FormSuitability = () => {
  const { errors, success, handleSubmit, isPending, message } = useFormMagicLink()

  return (
    <div className='max-w-80 w-full space-y-3'>
      <div className="space-y-2 text-center">
        <h1 className="text-xl font-semibold">Acessar Carteira</h1>
        <span>Insira suas informações para avançar</span>
      </div>

      <form
        onSubmit={handleSubmit}
        className="space-y-3 w-full"
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

        <div className='mt-4' />
        <Button variant='secondary' type="submit" className='w-full mt-4' disabled={isPending}>{isPending ? (
          <Icons.loader className="size-4 animate-spin" />
        ) : (
          'Acessar'
        )}</Button>
      </form>
    </div>
  )
}

export default FormSuitability