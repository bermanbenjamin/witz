import type { Role } from '@witz/auth'

export interface UserJwt {
  sub: string
  role: Role
}
