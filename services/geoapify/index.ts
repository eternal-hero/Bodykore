import { Coordinates } from "services/graphCMS";

/**
 * Uses private tokens, functions only on server-side,
 * use method from /services/api for client-side
 * @param zipCode
 * @returns
 */
export const getCoordinates = async (
  zipCode: string
): Promise<Coordinates | undefined> => {
  const params = new URLSearchParams();
  params.append('postcode', zipCode);
  params.append('filter', 'countrycode:us');
  params.append('format', 'json');
  params.append('apiKey', process.env.GEOAPIFY_API_KEY!);
  const res = await fetch(
    `https://api.geoapify.com/v1/geocode/search?${params.toString()}`,
    { method: 'GET' }
  );
  const resJson = await res.json();
  if (resJson.results.length !== 0) {
    // The query fetches more information than returning below
    return {
      longitude: resJson.results[0].lon,
      latitude: resJson.results[0].lat,
    };
  }
  return;
};
