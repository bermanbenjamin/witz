import { redirect } from 'next/navigation'

import { appRoutes } from '@/lib/constants'

export default async function HomePage() {
  redirect(appRoutes.suitability)
  return <div />
}
