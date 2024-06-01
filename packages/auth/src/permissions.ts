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
    can('get', 'User', { id: {$eq: user.id} }) // Member can read their own User information
    can('create', 'User', { id: {$eq: user.id} }) // Member can read their own User information
    can('delete', 'User', { id: {$eq: user.id} }) // Member can read their own User information
    can('get', 'Suitability', { userId: {$eq: user.id} }) // Member can read their own Suitability information
    can('create', 'Suitability', { userId: {$eq: user.id} }) // Member can manage their own Suitability information
    can('delete', 'Suitability', { userId: {$eq: user.id} }) // Member can manage their own Suitability information
  },
  GUEST: (user, { can }) => {
    can('get', 'User', { id: {$eq: user.id} }) // Member can read their own User information
    can('update', 'User', { id: {$eq: user.id} }) // Member can read their own User information
    can('delete', 'User', { id: {$eq: user.id} }) // Member can read their own User information
    can('get', 'Suitability', { userId: {$eq: user.id} }) // Member can read their own Suitability information
    can('create', 'Suitability', { userId: {$eq: user.id} }) // Member can manage their own Suitability information
    can('delete', 'Suitability', { userId: {$eq: user.id} }) // Member can manage their own Suitability information
  }
}
