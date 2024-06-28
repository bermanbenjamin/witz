import { Icons } from '@/components/icons'
import { Badge } from '@/components/ui/badge'
import { auth } from '@/lib/auth'
import { suitabilityInitialText } from '@/lib/constants'
import { parseProfileType } from '@/lib/utils'

import CreateSuitabilityButton from './components/create-suitability-button'
import SuitabilityCard from './components/suitability-card'

export default async function SuitabilityPage() {
  const { user } = await auth()

  return (
    <section className='w-full'>
      <div className='flex items-center justify-between'>
        <div className='flex items-center space-x-6'>
          <h1 className='font-semibold text-3xl'>Suitability</h1>
          {user.profileType && <Badge variant='custom'>{parseProfileType(user.profileType)}</Badge>}
        </div>
        <CreateSuitabilityButton suitabilities={user.suitabilities} />
      </div>

      <div className='w-full mt-4'>
        <span className='text-justify flex flex-col whitespace-pre-wrap'>{suitabilityInitialText}</span>
      </div>

      <div className='flex flex-col gap-y-5 mt-12'>
        <div className='flex items-center space-x-1'>
          <Icons.fileArchive className='w-6 h-6' />
          <h1 className='text-xl font-semibold'>Histórico</h1>
        </div>
        <div className='grid grid-cols-5 gap-x-10'>
          {user.suitabilities === undefined || user.suitabilities.length === 0 && (<span className='text-muted-foreground font-semibold'>Sem histórico suitability ainda.</span>)}
          {user.suitabilities.length > 0 && user.suitabilities.map((suitability) => (
            <SuitabilityCard key={suitability.id} createdAt={suitability.createdAt} />
          ))}
        </div>
      </div>
    </section>
  )
}
