import { memo, useCallback } from 'react'

import { useSharedLocations } from '../../hooks/use-shared-locations'
import { SharedLocationMarkerItem } from './shared-location-marker-item'

function SharedLocationMarkerList() {
  const { data: sharedLocations = [] } = useSharedLocations()

  const renderSharedLocationMarkerList = useCallback(
    () =>
      sharedLocations.map(sharedLocation => (
        <SharedLocationMarkerItem
          key={sharedLocation.id}
          sharedLocation={sharedLocation}
        />
      )),
    [sharedLocations]
  )
  return <>{renderSharedLocationMarkerList()}</>
}
export default memo(SharedLocationMarkerList)
