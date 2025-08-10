// hooks/useUrlPositions.ts
import { useSearchParams } from "react-router-dom";

export const useUrlPositions = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const latParam = searchParams.get("lat");
  const lngParam = searchParams.get("lng");

  const lat = latParam ? Number(latParam) : null;
  const lng = lngParam ? Number(lngParam) : null;

  const setUrlPosition = (lat: number, lng: number) => {
    const params = new URLSearchParams(searchParams);
    params.set("lat", lat.toString());
    params.set("lng", lng.toString());
    setSearchParams(params, { replace: true });
  };

  return [lat, lng, setUrlPosition] as const;
};
