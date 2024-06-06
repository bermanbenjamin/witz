import { Icons } from '@/components/icons'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { suitabilityInitialText } from '@/lib/constants'
import SuitabilityCard from './components/suitability-card'

const SuitabilityPage = () => {
  return (
    <section className='w-full'>
      <div className='flex items-center justify-between'>
        <div className='flex items-center space-x-6'>
          <h1 className='font-semibold text-3xl'>Suitability</h1>
          <Badge variant='custom'>PERFIL AGRESSIVO</Badge>
        </div>
        <Button className='flex items-center gap-x-2'>
          <Icons.update className='w-4 h-4' />
          Responder questionário
          </Button>
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
          <SuitabilityCard />
          <SuitabilityCard />
        </div>
      </div>
    </section>
  )
}

export default SuitabilityPage