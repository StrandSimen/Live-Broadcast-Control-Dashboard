import type { StreamCard as StreamCardData } from '../../type';

type StreamCardProps = {
  stream: StreamCardData;
};

const getStatus = (latency: number, packetLoss: number) => {
    if (latency > 60 || packetLoss > 1) {
        return "unhealthy";
    }

    if (latency > 40 || packetLoss > 0.6) {
        return "degraded";
    }

    return "healthy";
};

export const StreamCard = ({ stream }: StreamCardProps) => {
  const statusLabel = getStatus(stream.latency, stream.packetLoss).charAt(0).toUpperCase() + getStatus(stream.latency, stream.packetLoss).slice(1);

  return (
    <div className={`card ${getStatus(stream.latency, stream.packetLoss)}`}>
      <h4>{stream.name}</h4>
      <p
        className={`status-badge ${getStatus(stream.latency, stream.packetLoss)}`}
        aria-label={`Stream status: ${statusLabel}`}
      >
        {statusLabel}
      </p>
      <p>Bitrate: {stream.bitrate} Mbps</p>
      <p>Latency: {stream.latency} ms</p>
      {stream.latency > 60 && (
        <p className="warning">⚠ High latency detected</p>
      )}
      <p>Packet Loss: {stream.packetLoss} %</p>
      {stream.packetLoss > 1 && (
        <p className="warning">⚠ Packet loss is elevated</p>
      )}
      <p>Uptime: {stream.uptime}</p>
      <p>Region: {stream.region}</p>
    </div>
  );
};
