import { Icons } from '@/components/icons'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { Label } from '@/components/ui/label'
import { useCreateSuitabilityPageContext } from '@/context/use-create-suitability-page'

export default function SuitabilityTerms() {
  const { isCheckedTerms, onCheckTerms, isPending } =
    useCreateSuitabilityPageContext()

  return (
    <div className="w-full flex flex-col gap-y-4">
      <h1 className="text-2xl font-semibold">Aceitar Termos e Condições</h1>
      <p className="flex w-[95%]">
        Ao acessar e utilizar nossa plataforma, você concorda integralmente com
        os seguintes termos: você utilizará nossos serviços apenas para
        propósitos legais, não comprometerá a segurança ou a disponibilidade da
        plataforma, e concorda com nossa política de privacidade. Reservamo-nos
        o direito de modificar ou interromper qualquer parte dos serviços a
        qualquer momento. Você é responsável por manter a confidencialidade de
        suas informações de conta.
      </p>

      <div className="flex items-center space-x-2 mt-4">
        <Checkbox checked={isCheckedTerms} onCheckedChange={onCheckTerms} />
        <Label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
          Concordo com os termos e condições
        </Label>
      </div>

      <div className="flex w-full mt-8">
        <Button type="submit" disabled={isPending}>
          {isPending && <Icons.loader className="animate-spin mr-2 size-4" />}
          Finalizar
        </Button>
      </div>
    </div>
  )
}
