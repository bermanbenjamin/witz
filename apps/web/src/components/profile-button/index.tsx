'use client'
import Link from 'next/link'

import { Icons } from '@/components/icons'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { useGetProfile } from '@/hooks/user/use-get-profile'
import { appRoutes } from '@/lib/constants'

function getInitials(name: string): string {
  const initials = name
    .split(' ')
    .map((word) => word.charAt(0).toUpperCase())
    .slice(0, 2)
    .join('')

  return initials
}

export function ProfileButton() {
  const { data: currentUser } = useGetProfile()

  return (
    <>
      {currentUser?.role === 'GUEST' && (
        <Button>
          <Link href={appRoutes.finishRegister}>Finalizar cadastro</Link>
        </Button>
      )}
      <DropdownMenu>
        <DropdownMenuTrigger className="flex items-center gap-3 outline-none">
          <Avatar className="size-8">
            {currentUser?.name && (
              <AvatarFallback>{getInitials(currentUser?.name)}</AvatarFallback>
            )}
          </Avatar>
          <Icons.arrowDown className="size-4 text-muted-foreground" />
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem asChild className="cursor-pointer">
            <a href="/api/auth/sign-out">
              <Icons.logOut className="mr-2 size-4" />
              Sair
            </a>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  )
}
