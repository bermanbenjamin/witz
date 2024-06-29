import { DefinedInitialDataOptions, useQuery } from '@tanstack/react-query'

import { getProfileService } from '@/http/user/get-profile'
import type { UserDTO } from '@/lib/model'

export const useGetProfile = (options?: DefinedInitialDataOptions<UserDTO>) =>
  useQuery({
    queryKey: ['current-user'],
    queryFn: async () => getProfileService(),
    ...options,
  })
