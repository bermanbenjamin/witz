'use client'

import { createContextualCan } from '@casl/react'
import { UserDTO } from '@witz/api/src/models/user'
import { defineAbilityFor, type AppAbility } from '@witz/auth'
import { createContext, type ReactNode } from 'react'

interface Props {
  user: UserDTO
  children: ReactNode
}

type ContextAbility = AppAbility

const AbilityContext = createContext<ContextAbility>({} as ContextAbility)

export const Can = createContextualCan(AbilityContext.Consumer)

const AbilityProvider = ({ user, children }: Props) => {
  const ability = defineAbilityFor(user)

  return <AbilityContext.Provider value={ability}>{children}</AbilityContext.Provider>
}

export { AbilityProvider }




