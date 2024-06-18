import { redirect } from 'next/navigation'

import Header from '@/components/header'
import Menu from '@/components/menu'
import { auth, isAuthenticated } from '@/lib/auth'
import { appRoutes } from '@/lib/constants'
import { AbilityProvider } from '@/providers/ability-provider'

export default async function AppLayout({ children }: { children: React.ReactNode }) {
  const { user } = await auth()

  if (!isAuthenticated()) {
    redirect(appRoutes.signIn)
  }

  return (
    <AbilityProvider user={user}>
    <main className="mx-auto h-screen w-full max-w-[1440px] px-8">
      <Header />
      <Menu />
      <section className="py-6">{children}</section>
    </main>
    </AbilityProvider>
  )
}
