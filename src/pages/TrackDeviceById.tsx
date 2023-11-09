import { useEffect, useState } from "react";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import { useNavigate, useParams } from "react-router-dom";
import { io } from "socket.io-client";
import "leaflet/dist/leaflet.css";
import { config } from "../../project.config";

interface Device {
  deviceId: string;
  _id: string;
  brand: string;
  createdAt: Date;
  latitude: number;
  longitude: number;
}

export function TrackDeviceById() {
  const { deviceId } = useParams();
  const navigate = useNavigate();

  const [device, setDevice] = useState<Device>({
    _id: "",
    brand: "",
    deviceId: "",
    latitude: 0,
    createdAt: new Date(),
    longitude: 0,
  });

  useEffect(() => {
    fetch(`${config.NODE_URL}/devices/${deviceId}/location`)
      .then((response) => response.json())
      .then((data) => {
        setDevice((prev) => ({
          ...prev,
          latitude: data[0].location.latitude,
          longitude: data[0].location.longitude,
        }));
      });
  }, []);

  useEffect(() => {
    if (!deviceId) {
      navigate("/");
    }

    const socket = io(config.NODE_URL);

    socket.on("location@new", (data: Device) => {
      if (data.deviceId === deviceId) {
        setDevice(data);
      }
    });

    return () => {
      socket.disconnect();
    };
  }, [deviceId, navigate]);

  return (
    <MapContainer center={[30, 20]} zoom={1.5} id="main-map">
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker position={[device.latitude, device.longitude]}>
        <Popup>
          <div className="marker">
            <span>
              <strong>Id do dispositivo</strong>: {device.deviceId}
            </span>
            <span>
              <strong>Marca</strong>: {device.brand}
            </span>
            <span>
              <strong>Data da última localização</strong>:{" "}
              {device.createdAt?.toString()}
            </span>
          </div>
        </Popup>
      </Marker>
    </MapContainer>
  );
}
