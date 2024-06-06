import logoWhite from '@/assets/logo-white.svg'
import { Badge } from '@/components/ui/badge'
import { appRoutes, headerItems } from '@/lib/constants'
import Image from 'next/image'
import Link from 'next/link'
import { Button } from '../ui/button'

const Header = () => {
  return (
    <section className="flex w-full items-center justify-between pt-9 pb-6">
      <div className='flex items-center space-x-3 w-full'>
        <Link href='/home'>
      <Image
        src={logoWhite}
        alt="logo-white"
        height={1000}
        width={1000}
        className="h-full max-h-6 w-full max-w-32"
      />
      </Link>
      <span className='text-muted-foreground'>/</span>
      <span className='text-sm'>Antonio Carlos</span>
      <Badge variant='custom' className='text-xs'>PERFIL AGRESSIVO</Badge>
      </div>

      <div className='flex w-full items-center gap-x-8'>
        <div className='flex w-full items-center gap-x-2 justify-end'>
{headerItems.map((item) => <Link href={item.path} key={item.path}>{item.name}</Link>)}
        </div>
        <Button><Link href={appRoutes.signUp}>Finalizar cadastro</Link></Button>
      </div>

    </section>
  )
}

export default Header