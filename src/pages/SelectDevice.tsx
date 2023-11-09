import { useEffect, useState } from "react";
import { config } from "../../project.config.ts";
import { useNavigate } from "react-router-dom";
import { Device } from "../components/Device.tsx";

interface Device {
  device: {
    totals?: {
      totalPositions?: number;
      totalKm?: number;
    };
    _id: string;
    name: string;
    code: string;
    active: boolean;
    brand: string;
    createdAt: Date;
  };
}

export function SelectDevice() {
  const navigate = useNavigate();
  const [devices, setDevices] = useState<Device[]>([]);

  async function loadDevices() {
    const response = await fetch(`${config.NODE_URL}/devices`);

    const data: Device[] = await response.json();

    setDevices(data);
  }

  function handleSelectDevice(deviceId: string) {
    navigate(`/location/${deviceId}`);
  }

  useEffect(() => {
    loadDevices();
  }, []);

  return (
    <main className="select-device-main">
      <div>
        <h3>Escolha um dispositivo:</h3>
        <div className="device-list-container">
          {devices.length ? (
            devices.map(({ device }) => (
              <Device device={device} handleSelectDevice={handleSelectDevice} />
            ))
          ) : (
            <span>Nenhum dispositivo encontado.</span>
          )}
        </div>
      </div>
    </main>
  );
}
