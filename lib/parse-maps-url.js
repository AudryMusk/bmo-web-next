/**
 * Parseur de liens de localisation
 * Supporte : Google Maps, WhatsApp, coordonnées brutes
 */

export function parseGoogleMapsUrl(url) {
  if (!url) return null

  // Format 1 : ?q=lat,lng  (WhatsApp, partage direct)
  const qMatch = url.match(/[?&]q=(-?\d+\.?\d*),(-?\d+\.?\d*)/)
  if (qMatch) return { lat: parseFloat(qMatch[1]), lng: parseFloat(qMatch[2]) }

  // Format 2 : /@lat,lng,zoom  (Google Maps classique)
  const atMatch = url.match(/\/@(-?\d+\.?\d*),(-?\d+\.?\d*)/)
  if (atMatch) return { lat: parseFloat(atMatch[1]), lng: parseFloat(atMatch[2]) }

  // Format 3 : /maps?ll=lat,lng
  const llMatch = url.match(/[?&]ll=(-?\d+\.?\d*),(-?\d+\.?\d*)/)
  if (llMatch) return { lat: parseFloat(llMatch[1]), lng: parseFloat(llMatch[2]) }

  // Format 4 : !3dlat!4dlng (URL longue Google Maps)
  const dMatch = url.match(/!3d(-?\d+\.?\d*)!4d(-?\d+\.?\d*)/)
  if (dMatch) return { lat: parseFloat(dMatch[1]), lng: parseFloat(dMatch[2]) }

  // Format 5 : coordonnées brutes  "6.350956, 2.347800"
  const rawMatch = url.trim().match(/^(-?\d+\.?\d*)[,\s]+(-?\d+\.?\d*)$/)
  if (rawMatch) return { lat: parseFloat(rawMatch[1]), lng: parseFloat(rawMatch[2]) }

  return null
}

export function isValidCoords(lat, lng) {
  return lat >= -90 && lat <= 90 && lng >= -180 && lng <= 180
}
