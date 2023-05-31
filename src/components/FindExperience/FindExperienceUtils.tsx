export const generateGoogleMapsURL = (
  lat: number,
  lng: number,
  city: string | null,
  registered: boolean
): string => {
  if (registered) {
    return `https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}`;
  }

  return `https://www.google.com/maps/dir/?api=1&destination=${city}`;
};
