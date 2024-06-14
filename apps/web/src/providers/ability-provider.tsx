'use client'

import { createContextualCan } from '@casl/react'
import { type AppAbility, defineAbilityFor, type Role } from '@witz/auth'
import { createContext, type ReactNode } from 'react'

interface Props {
  user: {
    id: string;
    name: string | null;
    email: string;
    role: Role
}
  children: ReactNode
}

type ContextAbility = AppAbility

const AbilityContext = createContext<ContextAbility>({} as ContextAbility)

export const Can = createContextualCan(AbilityContext.Consumer)

const AbilityProvider = ({ user, children }: Props) => {
  const permissions = defineAbilityFor({ id: user.id, role: user.role })
  
  return <AbilityContext.Provider value={permissions}>{children}</AbilityContext.Provider>
}

export { AbilityProvider }




