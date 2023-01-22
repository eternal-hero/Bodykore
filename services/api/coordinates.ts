import routes from '@config/routes';
import { Coordinates } from 'services/graphCMS';


export const getCoordinatesAPI = async (
  zipCode: string
): Promise<Coordinates | undefined> => {
  // Gives a soft error for not using absolute URL
  const res = await fetch(`${routes.api.coordinates.path}?zipCode=${zipCode}`, {
    method: 'GET',
  });
  if (res.ok) {
    const resJson = await res.json();
    return resJson;
  }
  return;
};
