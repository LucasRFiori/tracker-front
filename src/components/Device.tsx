interface DeviceProps {
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
  handleSelectDevice: (deviceId: string) => void;
}

export function Device({ device, handleSelectDevice }: DeviceProps) {
  return (
    <div
      key={device._id}
      className="device"
      onClick={() => handleSelectDevice(device._id)}
    >
      <figure>
        <img src="smartphone-call.png"></img>
      </figure>
      <div className="device-info">
        <span>
          <b>Nome</b>: {device.name}
        </span>
        <span>
          <b>Marca</b>: {device.brand}
        </span>
        <span>
          <b>Código</b>: {device.code}
        </span>
        <span>
          <b>Cadastro realizado em:</b>:{" "}
          {device.createdAt.toLocaleString("pt-BR")}
        </span>
      </div>
    </div>
  );
}
