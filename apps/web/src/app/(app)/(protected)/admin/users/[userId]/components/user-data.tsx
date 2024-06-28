import { format } from 'date-fns'

import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import type { UserDTO } from '@/lib/model'

interface UserDataProps {
  userProps: UserDTO
}

export default function UserData({ userProps }: UserDataProps) {
  return (
    <div className="mt-6 grid w-full grid-cols-3 gap-8">
      <div className="flex flex-col space-y-2">
        <Label className="text-primary font-semibold">Nome</Label>
        <Input
          variant="secondary"
          className="font-medium"
          value={userProps?.name}
          readOnly
        />
      </div>
      <div className="flex flex-col space-y-2">
        <Label className="text-primary font-semibold">Email</Label>
        <Input
          variant="secondary"
          className="font-medium"
          value={userProps?.email}
          readOnly
        />
      </div>
      <div className="flex flex-col space-y-2">
        <Label className="text-primary font-semibold">CPF</Label>
        <Input
          variant="secondary"
          className="font-medium"
          value={userProps?.cpf}
          readOnly
        />
      </div>
      <div className="flex flex-col space-y-2">
        <Label className="text-primary font-semibold">Data de Nascimento</Label>
        <Input
          variant="secondary"
          className="font-medium"
          value={userProps?.birthDate}
          readOnly
        />
      </div>
      <div className="flex flex-col space-y-2">
        <Label className="text-primary font-semibold">Celular</Label>
        <Input
          variant="secondary"
          className="font-medium"
          value={userProps?.phone}
          readOnly
        />
      </div>
      <div className="flex flex-col space-y-2">
        <Label className="text-primary font-semibold">Nível</Label>
        <Input
          variant="secondary"
          className="font-medium"
          value={userProps?.role}
          readOnly
        />
      </div>
      <div className="flex flex-col space-y-2">
        <Label className="text-primary font-semibold">Tipo de Perfil</Label>
        <Input
          variant="secondary"
          className="font-medium"
          value={userProps?.profileType?.toString()}
          readOnly
        />
      </div>
      <div className="flex flex-col space-y-2">
        <Label className="text-primary font-semibold">Usuário Criado</Label>
        <Input
          variant="secondary"
          className="font-medium"
          value={format(userProps?.createdAt, 'dd MMM yyy')}
          readOnly
        />
      </div>
    </div>
  )
}
