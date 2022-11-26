import type { Prisma } from '@prisma/client'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import type { AxiosError } from 'axios'

import { REACT_QUERY_KEYS } from '../constants/react-query-keys'
import { axiosClient } from '../utils/axios-client'

export interface CreateSharedLocationPayload
  extends Omit<Prisma.SharedLocationCreateInput, 'logo'> {
  logo: File
}

export const useCreateSharedLocation = () => {
  const queryClient = useQueryClient()
  return useMutation<string, Error, FormData>(
    payload =>
      axiosClient
        .post<string>('/shared-locations', payload)
        .then(res => res.data)
        .catch(error => {
          throw new Error(
            (error as AxiosError<{ message: string }>).response?.data
              ?.message ?? "Couldn't create shared location"
          )
        }),
    {
      onSuccess: async () => {
        await queryClient.invalidateQueries(REACT_QUERY_KEYS.sharedLocations)
      },
    }
  )
}
