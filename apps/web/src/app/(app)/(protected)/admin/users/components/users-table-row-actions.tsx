import type { Row } from '@tanstack/react-table'
import Link from 'next/link'

import { Icons } from '@/components/icons'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { appRoutes } from '@/lib/constants'

import type { UserTableColumn } from './columns'

interface UsersTableRowActionsProps<TData> {
  row: Row<TData>
}

export default function UsersTableRowActions<TData>({
  row,
}: UsersTableRowActionsProps<TData>) {
  const userProps = row.original as UserTableColumn

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="flex h-8 w-8 p-0 data-[state=open]:bg-muted"
        >
          <Icons.horizontalEllipsis className="size-4" />
          <span className="sr-only">Opções</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-[160px]">
        <DropdownMenuItem className="cursor-pointer" asChild>
          <Link href={`${appRoutes.admin.users}/${userProps.id}`}>
            Ver Detalhes
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem className="cursor-pointer">
          Atualizar Fee
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuSeparator />
        <DropdownMenuItem className="cursor-pointer">
          Deletar
          <Icons.delete className="size-4 ml-auto" />
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
