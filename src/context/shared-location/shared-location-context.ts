import type { Dispatch, SetStateAction } from 'react'
import { createContext, useContext } from 'react'

export interface ISharedLocationContext {
  showSharedLocationModal: boolean
  setShowSharedLocationModal: Dispatch<SetStateAction<boolean>>
}

export const SharedLocationContext = createContext<
  ISharedLocationContext | undefined
>(undefined)

export const useSharedLocation = () => {
  const context = useContext(SharedLocationContext)
  if (!context)
    throw new Error(
      'useSharedLocationModal must be used within a SharedLocationContext'
    )
  return context
}
