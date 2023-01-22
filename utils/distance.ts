import { Coordinates, Store } from 'services/graphCMS';

/**
 * Return the distance beetwen two coordinates in miles.
 * @param latA
 * @param lonA
 * @param latB
 * @param lonB
 * @returns
 */
export function getDistance(
  latA: number,
  lonA: number,
  latB: number,
  lonB: number
) {
  const earthRadius = 6371;
  const p = Math.PI / 180;
  const a =
    0.5 -
    Math.cos((latB - latA) * p) / 2 +
    (Math.cos(latA * p) *
      Math.cos(latB * p) *
      (1 - Math.cos((lonB - lonA) * p))) /
      2;
  return 2 * earthRadius * Math.asin(Math.sqrt(a)) * 0.621371;
}

export function orderStoreByDistance(stores: Store[], input: Coordinates) {
  return stores.sort(
    (a, b) =>
      getDistance(
        a.coordinates.latitude,
        a.coordinates.longitude,
        input.latitude,
        input.longitude
      ) -
      getDistance(
        b.coordinates.latitude,
        b.coordinates.longitude,
        input.latitude,
        input.longitude
      )
  );
}
