import type { StreamCard as StreamCardData } from '../../type';

type StreamCardProps = {
  stream: StreamCardData;
};

export const StreamCard = ({ stream }: StreamCardProps) => {
  const statusLabel = stream.status.charAt(0).toUpperCase() + stream.status.slice(1);

  return (
    <div className={`card ${stream.status}`}>
      <h4>{stream.name}</h4>
      <p
        className={`status-badge ${stream.status}`}
        aria-label={`Stream status: ${statusLabel}`}
      >
        {statusLabel}
      </p>
      <p>Bitrate: {stream.bitrate} Mbps</p>
      <p>Latency: {stream.latency} ms</p>
      {stream.latency > 50 && (
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
