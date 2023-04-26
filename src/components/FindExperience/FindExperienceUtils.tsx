export const generateGoogleMapsURL = (lat: number, lng: number) => {
  return `https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}`;
};
