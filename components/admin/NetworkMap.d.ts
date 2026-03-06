interface NetworkMapItem {
  id?: string
  lat?: number | null
  lng?: number | null
  address?: string | null
  logo?: string | null
  [key: string]: unknown
}

interface NetworkMapProps {
  items?: NetworkMapItem[]
  primaryField?: string
  secondaryField?: string
  entityLabel?: string
  entityLabelPlural?: string
  captureHrefBase?: string
  markerEmoji?: string
  markerColor?: string
}

declare function NetworkMap(props: NetworkMapProps): JSX.Element

export default NetworkMap
