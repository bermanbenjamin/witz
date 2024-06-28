import { Suspense } from 'react'

import { Icons } from '@/components/icons'

import { getAllUsers } from './actions'
import UsersTable from './components/users-table'

export default async function UsersPage() {
  const users = await getAllUsers()

  if (!users) {
    return <div>No users found</div>
  }

  return (
    <div className="w-full">
      <Suspense
        fallback={
          <div className="flex items-center space-x-2">
            <Icons.loader className="animate-spin size-3.5" />
            Carregando...
          </div>
        }
      >
        <UsersTable users={users} />
      </Suspense>
    </div>
  )
}
