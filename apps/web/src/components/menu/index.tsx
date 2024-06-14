import { menuItems } from '@/lib/constants'
import { Can } from '@/providers/ability-provider'

import { Icons } from '../icons'
import { MenuLink } from './menu-link'

export function Menu() {
  return (
    <nav className="flex items-center space-x-2 lg:space-x-3">
      {menuItems.map((item) => (
        <MenuLink key={item.path} href={item.path}>
          {item.name}
        </MenuLink>
      ))}
      <Can I='read' an='User'>
       <MenuLink href={'/admin/users'}>
        <div className='flex items-center space-x-2'>
        <span>Usuários</span>
        <Icons.verified className='w-3 h-3 text-blue-600' />
        </div>
        </MenuLink>
        </Can>
    </nav>
  )
}

export default Menu