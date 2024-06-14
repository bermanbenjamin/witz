import Image from 'next/image'
import Link from 'next/link'

import logoWhite from '@/assets/logo-white.svg'
import { Icons } from '@/components/icons'
import { ProfileButton } from '@/components/profile-button'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { auth } from '@/lib/auth'
import { appRoutes, headerItems } from '@/lib/constants'

export async function Header()  {
  const { user } = await auth()
  
  return (
    <section className="flex w-full items-center justify-between pt-9 pb-6">
      <div className='flex items-center space-x-3 w-full'>
        <Link href={appRoutes.suitability}>
      <Image
        src={logoWhite}
        alt="logo-white"
        height={1000}
        width={1000}
        className="h-full max-h-6 w-full max-w-32"
      />
      </Link>
      <Icons.slash className="size-3 -rotate-[24deg] text-muted-foreground" />
      <span className='text-sm'>{user.name}</span>
      <Badge variant='custom' className='text-xs'>PERFIL AGRESSIVO</Badge>
      </div>

      <div className='flex w-full items-center gap-x-8'>
        <div className='flex w-full items-center gap-x-2 justify-end'>
          {headerItems.map((item) => <Link href={item.path} key={item.path}>{item.name}</Link>)}
        </div>
        <Button><Link href={appRoutes.signUp}>Finalizar cadastro</Link></Button>
        <ProfileButton />
      </div>

    </section>
  )
}

export default Header