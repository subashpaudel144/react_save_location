import type { SharedLocation } from '@prisma/client'
import { useQuery } from '@tanstack/react-query'

import { REACT_QUERY_KEYS } from '../constants/react-query-keys'
import { axiosClient } from '../utils/axios-client'

export const useSharedLocations = () => {
  return useQuery(REACT_QUERY_KEYS.sharedLocations, () =>
    axiosClient.get<SharedLocation[]>('/shared-locations').then(res => res.data)
  )
}
