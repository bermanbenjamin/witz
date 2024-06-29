'use client'

import { createContextualCan } from '@casl/react'
import { type AppAbility, defineAbilityFor } from '@witz/auth'
import { createContext, type ReactNode } from 'react'

import type { UserDTO } from '@/lib/model'

interface Props {
  user: UserDTO
  children: ReactNode
}

type ContextAbility = AppAbility

const AbilityContext = createContext<ContextAbility>({} as ContextAbility)

export const Can = createContextualCan(AbilityContext.Consumer)

const AbilityProvider = ({ user, children }: Props) => {
  const permissions = defineAbilityFor({ id: user.id, role: user.role })

  return (
    <AbilityContext.Provider value={permissions}>
      {children}
    </AbilityContext.Provider>
  )
}

export { AbilityProvider }
