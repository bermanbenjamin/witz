import { defineAbilitiesFor } from '@witz/auth'

const ability = defineAbilitiesFor({ role: 'ADMIN' })
const userCanInviteSomeoneElse = ability.can('delete', 'User')

console.log('userCanInviteSomeoneElse?', userCanInviteSomeoneElse)
