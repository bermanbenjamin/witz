import { AbilityBuilder } from '@casl/ability'

import { AppAbility } from '.'
import { User } from './models/user'
import { Role } from './roles'

type PermissionsByRole = (
  user: User,
  builder: AbilityBuilder<AppAbility>,
) => void

export const permissions: Record<Role, PermissionsByRole> = {
  ADMIN: (_, { can }) => {
    can('manage', 'all') // Admin can perform any action on any resource
  },
  MEMBER: (user, { can }) => {
    can('get', 'User', { id: user.id }) // Member can read their own User information
    can('get', 'Suitability', { userId: user.id }) // Member can read their own Suitability information
    can('manage', 'Suitability', { userId: user.id }) // Member can manage their own Suitability information
  },
}
