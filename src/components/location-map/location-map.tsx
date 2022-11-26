import 'mapbox-gl/dist/mapbox-gl.css'

import { useColorScheme } from '@mantine/hooks'
import { openContextModal } from '@mantine/modals'
import type { CSSProperties } from 'react'
import { useCallback, useMemo, useRef, useState } from 'react'
import type {
  MapLayerMouseEvent,
  MapRef,
  ViewStateChangeEvent,
} from 'react-map-gl'
import Map, { GeolocateControl, NavigationControl } from 'react-map-gl'

import { useSharedLocation } from '../../context/shared-location'
import { useUserCoordinates } from '../../hooks/use-user-coordinates'
import { SharedLocationMarkerList } from '../shared-location-marker-list'

const mapboxAccessToken = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN
const mapLightStyle = process.env.NEXT_PUBLIC_MAPBOX_MAP_LIGHT_STYLE
const mapDarkStyle = process.env.NEXT_PUBLIC_MAPBOX_MAP_DARK_STYLE

const INITIAL_ZOOM_LEVEL = 8

export function LocationMap() {
  const colorScheme = useColorScheme()
  const { coordinates } = useUserCoordinates()
  const { showSharedLocationModal } = useSharedLocation()
  const [zoom, setZoom] = useState(INITIAL_ZOOM_LEVEL)

  const mapRef = useRef<MapRef | null>(null)

  const mapContainerStyle = useMemo<CSSProperties>(
    () => ({
      position: 'fixed',
      inset: 0,
    }),
    []
  )
  const mapStyle = useMemo(
    () => (colorScheme === 'dark' ? mapDarkStyle : mapLightStyle),
    [colorScheme]
  )

  const handleZoom = useCallback((event: ViewStateChangeEvent) => {
    setZoom(event.viewState.zoom)
  }, [])

  const handleMapClick = useCallback(
    (event: MapLayerMouseEvent) => {
      const { lat, lng } = event.lngLat
      if (!showSharedLocationModal) return
      openContextModal({
        modal: 'shareLocation',
        title: 'Share your location',
        innerProps: {
          latitude: lat,
          longitude: lng,
        },
        closeOnClickOutside: false,
      })
    },
    [showSharedLocationModal]
  )
  return (
    <Map
      ref={mapRef}
      mapboxAccessToken={mapboxAccessToken}
      zoom={zoom}
      onZoom={handleZoom}
      onClick={handleMapClick}
      initialViewState={{
        longitude: coordinates?.longitude,
        latitude: coordinates?.latitude,
      }}
      style={mapContainerStyle}
      mapStyle={mapStyle}
    >
      <GeolocateControl />
      <NavigationControl />
      <SharedLocationMarkerList />
    </Map>
  )
}
