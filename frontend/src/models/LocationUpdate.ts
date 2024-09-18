/**
 * A location update from the device.
 */
type LocationUpdate = {
  coords: { latitude: number; longitude: number; altitude: number; accuracy: number; heading: number; speed: number }
  timestamp: number
}

export default LocationUpdate
