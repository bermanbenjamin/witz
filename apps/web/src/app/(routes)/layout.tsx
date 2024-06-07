import type { UserDTO } from '@witz/api/src/models/user'

import Header from '@/components/header'
import Menu from '@/components/menu'
import { AbilityProvider } from '@/providers/ability-provider'

export default async function AppLayout({ children }: { children: React.ReactNode }) {
const userProps: UserDTO = {
  id: '1',
  name: 'Antonio Carlos',
  email: 'email@test.com',
  passwordHash: 'password',
  role: 'MEMBER',
  createdAt: new Date(),
  updatedAt: new Date(),
}

  return (
    <AbilityProvider user={userProps}>
    <main className="mx-auto h-screen w-full max-w-7xl">
      <Header />
      <Menu />
      <section className="py-6">{children}</section>
    </main>
    </AbilityProvider>
  )
}
