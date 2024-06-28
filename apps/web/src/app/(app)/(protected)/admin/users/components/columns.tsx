'use client'

import { ColumnDef } from '@tanstack/react-table'
import type { Role } from '@witz/auth'

import UsersTableColumnHeader from './users-table-column-header'
import UsersTableRowActions from './users-table-row-actions'

export interface UserTableColumn {
  id: string
  name: string | null
  email: string
  role: Role
}

export const columns: ColumnDef<UserTableColumn>[] = [
  {
    accessorKey: 'name',
    header: ({ column }) => (
      <UsersTableColumnHeader column={column} title="Nome" />
    ),
  },
  {
    accessorKey: 'email',
    header: 'Email',
  },
  {
    accessorKey: 'role',
    header: ({ column }) => (
      <UsersTableColumnHeader column={column} title="Nível de acesso" />
    ),
  },
  {
    id: 'actions',
    cell: ({ row }) => <UsersTableRowActions row={row} />,
  },
]
