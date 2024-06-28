import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

import { columns, type UserTableColumn } from './columns'
import { DataTable } from './data-table'

interface UsersTableProps {
  users: UserTableColumn[]
}

export default function UsersTable({ users }: UsersTableProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-2xl">Clientes</CardTitle>
      </CardHeader>
      <CardContent>
        <DataTable searchKey="name" columns={columns} data={users} />
      </CardContent>
    </Card>
  )
}
