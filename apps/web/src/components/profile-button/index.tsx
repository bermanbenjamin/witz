'use client'
import { ChevronDown, Link, LogOut } from 'lucide-react'
import { Button } from 'react-day-picker'

import { Avatar, AvatarFallback } from '@/components/ui/avatar'
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
      {currentUser?.role === 'GUEST' ? (
        <Button>
          <Link href={appRoutes.signUp}>Finalizar cadastro</Link>
        </Button>
      ) : null}
      <DropdownMenu>
        <DropdownMenuTrigger className="flex items-center gap-3 outline-none">
          <Avatar className="size-8">
            {currentUser?.name && (
              <AvatarFallback>{getInitials(currentUser?.name)}</AvatarFallback>
            )}
          </Avatar>
          <ChevronDown className="size-4 text-muted-foreground" />
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem asChild className="cursor-pointer">
            <a href="/api/auth/sign-out">
              <LogOut className="mr-2 size-4" />
              Sair
            </a>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  )
}
