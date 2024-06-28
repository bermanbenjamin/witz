import type { ProfileType } from '@witz/api/src/models/profile-type'
import type { SuitabilityDTO } from '@witz/api/src/models/suitability'

export type UserDTO = {
  id: string
  name: string
  email: string
  phone: string
  cpf: string
  birthDate: string
  profileType: ProfileType
  suitabilities: SuitabilityDTO[]
  role: string
  createdAt: Date
}
