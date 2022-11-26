import { useEffect, useState } from 'react'

export const useUserCoordinates = () => {
  const [coordinates, setCoordinates] = useState<
    GeolocationCoordinates | undefined
  >()
  const [error, setError] = useState<GeolocationPositionError | undefined>()

  useEffect(() => {
    const watchId = navigator.geolocation.watchPosition(
      position => {
        setCoordinates(position.coords)
      },
      geoLocationPositionerror => {
        setError(geoLocationPositionerror)
      }
    )
    return () => {
      navigator.geolocation.clearWatch(watchId)
    }
  }, [])
  return { coordinates, error }
}
