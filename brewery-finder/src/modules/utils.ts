import { BreweryFeature } from '@/types/service'

export function getDirectionsUrl(feature: BreweryFeature): string {
  const props = feature.properties
  const addr_parts = [props.name, props.address, props.city, props.state, props.zip];
  // form query url for google directions, try address first if has address city st zip else use x,y
  const dest = addr_parts.every(f => !!f) ? addr_parts.join(' ').replace(/\s/g, '+'): `${props.y},${props.x}`;
  return `https://www.google.com/maps/dir/Current+Location/${dest}`;
}