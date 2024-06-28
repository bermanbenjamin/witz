import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function parseProfileType(profileType: string) {
  const types: Record<string, string> = {
    SUPER_CONSERVER: 'Super Conservador',
    CONSERVER: 'Conservador',
    MODERATE: 'Moderado',
    AGRESSIVE: 'Agressivo',
    SUPER_AGRESSIVE: 'Super Agressivo',
  }

  return types[profileType]
}
