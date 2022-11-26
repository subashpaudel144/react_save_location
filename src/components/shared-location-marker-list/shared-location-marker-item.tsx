import { openContextModal } from '@mantine/modals'
import type { SharedLocation } from '@prisma/client'
import { IconMapPin } from '@tabler/icons'
import { useCallback } from 'react'
import { Marker } from 'react-map-gl'

import { useSharedLocation } from '../../context/shared-location'

export interface SharedLocationMarkerItemProps {
  sharedLocation: SharedLocation
}
export function SharedLocationMarkerItem({
  sharedLocation,
}: SharedLocationMarkerItemProps) {
  const { setShowSharedLocationModal } = useSharedLocation()
  const { longitude, latitude } = sharedLocation

  const handleMarkerClick = useCallback(() => {
    setShowSharedLocationModal(false)
    openContextModal({
      title: 'Shared Location',
      modal: 'sharedLocationDetail',
      innerProps: {
        sharedLocation,
      },
      onClose() {
        setShowSharedLocationModal(true)
      },
    })
  }, [])
  return (
    <Marker
      longitude={longitude}
      latitude={latitude}
      anchor='bottom'
      onClick={handleMarkerClick}
    >
      <IconMapPin color='red' />
    </Marker>
  )
}
