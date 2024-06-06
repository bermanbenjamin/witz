import React from 'react'
import { MenuLink } from './menu-link'
import { menuItems } from '@/lib/constants'

const Menu = () => {
  return (
    <nav className="flex items-center space-x-2 lg:space-x-3">
      {menuItems.map((item) => (
        <MenuLink key={item.path} href={item.path}>
          {item.name}
        </MenuLink>
      ))}
    </nav>
  )
}

export default Menu