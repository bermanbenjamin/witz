import { Icons } from '@/components/icons'
import { appRoutes, menuItems } from '@/lib/constants'
import { Can } from '@/providers/ability-provider'

import { MenuLink } from './menu-link'

export function Menu() {
  return (
    <nav className="flex items-center space-x-2 lg:space-x-3">
      <Can I='read' an='User'>
       <MenuLink href={appRoutes.admin.home} shouldMatchExact={false}>
        <div className='flex items-center space-x-2'>
        <span>Admin</span>
        <Icons.verified className='w-3 h-3 text-primary' />
        </div>
        </MenuLink>
      </Can>
      <span className='cursor-not-allowed opacity-80 text-secondary text-sm flex items-center'>
          Home
          <Icons.lock className='size-3.5 ml-2' />
        </span>
      {menuItems.map((item) => (
        <MenuLink key={item.path} href={item.path} shouldMatchExact={false}>
          {item.name}
        </MenuLink>
      ))}
    </nav>
  )
}

export default Menu