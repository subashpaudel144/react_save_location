import type { ReactNode } from 'react'
import { useMemo, useState } from 'react'

import type { ISharedLocationContext } from './shared-location-context'
import { SharedLocationContext } from './shared-location-context'

export interface SharedLocationProviderProps {
  children: ReactNode
}
export function SharedLocationProvider({
  children,
}: SharedLocationProviderProps) {
  const [showSharedLocationModal, setShowSharedLocationModal] = useState(true)

  const value = useMemo<ISharedLocationContext>(
    () => ({
      showSharedLocationModal,
      setShowSharedLocationModal,
    }),
    [showSharedLocationModal, setShowSharedLocationModal]
  )
  return (
    <SharedLocationContext.Provider value={value}>
      {children}
    </SharedLocationContext.Provider>
  )
}
