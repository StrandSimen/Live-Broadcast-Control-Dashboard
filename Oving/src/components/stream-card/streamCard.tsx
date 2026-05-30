import { useMemo, useState, useEffect } from 'react';
import type { StreamCard as StreamCardData } from '../../type';
import { useUptime } from '../hooks/uptimeContext';

type StreamCardProps = {
  stream: StreamCardData;
};

const getStatus = (latency: number, packetLoss: number, bitrate: number) => {
    if (bitrate === 0 && latency === 0 && packetLoss === 0) {
        return "offline";
    }

    if (latency > 60 || packetLoss > 1) {
        return "unhealthy";
    }

    if (latency > 40 || packetLoss > 0.6) {
        return "degraded";
    }

    return "healthy";
};

const formatUptime = (totalSeconds: number): string => {
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;
  return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
};

export const StreamCard = ({ stream }: StreamCardProps) => {
  const contextElapsed = useUptime();
  const status = getStatus(stream.latency, stream.packetLoss, stream.bitrate);
  const isOffline = status === "offline";

  const [onlineSince, setOnlineSince] = useState<number | null>(null);

  useEffect(() => {
    if (!isOffline && onlineSince === null) {
      setOnlineSince(contextElapsed);
    }

    if (isOffline) {
      setOnlineSince(null);
    }}, [isOffline, contextElapsed, onlineSince]);

  const uptime = useMemo(() => {
    if (isOffline || onlineSince === null) {
      return formatUptime(0);
    }

    return formatUptime(contextElapsed - onlineSince);
  }, [isOffline, contextElapsed, onlineSince]);

  const statusLabel = status.charAt(0).toUpperCase() + status.slice(1);

  return (
    <div className={`card ${status}`}>
      <h4>{stream.name}</h4>
      <p
        className={`status-badge ${status}`}
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
      <p>Uptime: {uptime}</p>
      <p>Region: {stream.region}</p>
    </div>
  );
};
