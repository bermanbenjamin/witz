import AdminMenu from '@/components/admin-menu'

export default async function ProtectedLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <main className="grid h-full w-full grid-cols-[16rem_1fr] gap-x-6">
      <aside className="h-[calc(100vh-248px)]">
        <AdminMenu />
      </aside>
      <section>{children}</section>
    </main>
  )
}
