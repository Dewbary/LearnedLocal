import { useMemo, useState } from "react";
import { GoogleMap, useLoadScript, MarkerF, InfoWindow, } from "@react-google-maps/api";

export default function GoogleMaps() {
  const googleMapsApiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;
  if (googleMapsApiKey === undefined) {
   return <div>Error</div>;
  }
  return <Map googleMapsApiKey={googleMapsApiKey} />;
}

type Coordinates = {
  lat: number;
  lng: number;
};
type MapProps = {
  googleMapsApiKey: string;
};

function Map({ googleMapsApiKey }: MapProps) {
  const center = useMemo(() => ({ lat: 38.886518, lng: -121.0166301 }), []);