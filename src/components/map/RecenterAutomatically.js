import { useEffect } from "react";
import { useMap } from "react-leaflet";

const RecenterAutomatically = ({ lat, lng }) => {
  const map = useMap();
  useEffect(() => {
    map.setView([lat, lng]);
  }, [lat, lng]);
  return null;
};

export default RecenterAutomatically;
