import { useNavigate } from "react-router-dom";
import styles from "./Map.module.css";
import {
  MapContainer,
  Marker,
  Popup,
  TileLayer,
  useMap,
  useMapEvents,
} from "react-leaflet";
import { useEffect, useState } from "react";
import { LatLngExpression, LeafletMouseEvent } from "leaflet";
import { useCities } from "../../contexts/CitiesContext";
import { flagemojiToPNG } from "../../utils/flagemojiToPNG";
import { useGeolocation } from "../../hooks/useGeolocation";
import Button from "../Button";
import { ButtonType } from "../../types";
import { useUrlPositions } from "../../hooks/useUrlPositions";

const Map = () => {
  const { cities } = useCities();

  const [mapPosition, setMapPosition] = useState<LatLngExpression>([40, 0]);
  const {
    isLoading: isLoadingPosition,
    getPosition,
    position: geolocationPosition,
  } = useGeolocation();
  const [mapLat, mapLng] = useUrlPositions();

  useEffect(() => {
    if (mapLat && mapLng) setMapPosition([mapLat, mapLng]);
  }, [mapLat, mapLng]);

  useEffect(() => {
    if (geolocationPosition)
      setMapPosition([geolocationPosition.lat, geolocationPosition.lng]);
  }, [geolocationPosition]);

  return (
    <div className={styles.mapContainer}>
      <Button type={ButtonType.Position} onClick={getPosition}>
        {isLoadingPosition ? "Loading..." : "Use your Position"}
      </Button>

      <MapContainer
        center={mapPosition}
        zoom={13}
        scrollWheelZoom={true}
        className={styles.map}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png"
        />
        {cities.map((city) => {
          return (
            <Marker
              position={[city.position.lat, city.position.lng]}
              key={city.id}
            >
              <Popup>
                <span>{flagemojiToPNG(city.emoji)}</span>
                <span>{city.cityName}</span>
              </Popup>
            </Marker>
          );
        })}
        <ChangeCenter position={mapPosition} />
        <DetectClick />
      </MapContainer>
    </div>
  );
};

interface ChangeCenterProps {
  position: LatLngExpression;
}

function ChangeCenter({ position }: ChangeCenterProps) {
  const map = useMap();
  const [, , setUrlPosition] = useUrlPositions();

  useEffect(() => {
    if (position) {
      map.setView(position);

      if (Array.isArray(position)) {
        // Safe to access position[0] and position[1]
        // setUrlPosition(position[0], position[1]);
      } else {
        // If it's a LatLng object
        // setUrlPosition(position.lat, position.lng);
      }
    }
  }, [position]);

  return null;
}

function DetectClick() {
  const navigate = useNavigate();

  useMapEvents({
    click: (e: LeafletMouseEvent) => {
      navigate(`form?lat=${e.latlng.lat}&lng=${e.latlng.lng}`);
    },
  });

  return null;
}

export default Map;
