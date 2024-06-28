import Link from 'next/link'
import { redirect } from 'next/navigation'

import { Icons } from '@/components/icons'
import { Button } from '@/components/ui/button'
import { appRoutes } from '@/lib/constants'

import { getUserById } from './actions'
import UserData from './components/user-data'

interface UserDetailPageProps {
  params: {
    userId: string
  }
}

export default async function UserDetailPage({ params }: UserDetailPageProps) {
  const userProps = await getUserById(params.userId)

  if (!userProps) redirect(appRoutes.admin.users)

  return (
    <div>
      <Button variant="link" asChild className="text-white p-0">
        <Link href={appRoutes.admin.users}>
          <Icons.arrowBack className="h-4 w-4 mr-2" />
          Voltar
        </Link>
      </Button>
      <h1 className="text-xl font-semibold mt-2">Informações do Usuário</h1>
      <UserData userProps={userProps} />
    </div>
  )
}
