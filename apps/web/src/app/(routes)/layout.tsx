import Header from '@/components/header'
import Menu from '@/components/menu'

export default async function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <main className="mx-auto h-screen w-full max-w-7xl">
      <Header />
      <Menu />
      <section className="h-full py-6">{children}</section>
    </main>
  )
}
