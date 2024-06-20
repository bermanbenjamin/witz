'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

import { adminMenuItems } from '@/lib/constants'
import { cn } from '@/lib/utils'

export default function AdminMenu() {
  const pathname = usePathname()

  function isActiveTab(route: string) {
    return pathname === route
  }

  return (
    <nav className="h-full w-full border-r border-r-card p-4">
      <div className="flex flex-col space-y-4 font-medium">
        {adminMenuItems.map((item) => (
          <Link key={item.path} href={item.path} 
          className={cn('rounded-md px-4 py-2 text-sm flex items-center gap-x-2 transition-all hover:bg-card', isActiveTab(item.path) && 'bg-card')}>
            {item.icon}
            {item.name}
        </Link>
        ))}
      </div>
    </nav>
  )
}
