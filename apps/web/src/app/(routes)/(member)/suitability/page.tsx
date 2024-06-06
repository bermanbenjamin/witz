import { Icons } from '@/components/icons'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { suitabilityInitialText } from '@/lib/constants'

const SuitabilityPage = () => {
  return (
    <section className='h-full w-full'>
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

      <div className='h-full w-full'>
        <span className='text-justify flex flex-col'>{suitabilityInitialText}</span>
      </div>
    </section>
  )
}

export default SuitabilityPage