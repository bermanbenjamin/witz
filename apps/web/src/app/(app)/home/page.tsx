import { redirect } from 'next/navigation'

import { appRoutes } from '@/lib/constants'

export default function Home() {
  redirect(appRoutes.suitability)
  return <main className="">home</main>
}
