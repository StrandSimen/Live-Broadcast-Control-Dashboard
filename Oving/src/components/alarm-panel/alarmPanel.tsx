import './alarmPanel.css'
import { createContext, useCallback, useContext, useEffect, useState} from 'react';
import { type Alarm, type StreamCard } from '../../type';

type AlarmContextType = {
    alarms: Alarm[];
    detectAlarms: (streams: StreamCard[]) => void;
    dismissAlarm: (id: string) => void;
    acknowledgeAlarm: (id: string) => void;
};

const AlarmContext = createContext<AlarmContextType | undefined>(undefined);

export const AlarmProvider = ({ children }: { children: React.ReactNode }) => {
    const [alarms, setAlarms] = useState<Alarm[]>([]);
    const [prevStreams, setPrevStreams] = useState<StreamCard[]>([]);

    const detectAlarms = useCallback((streams: StreamCard[]) => {
        const newAlarms: Alarm[] = [];
        const alarmsToRemove: string[] = [];

        streams.forEach((stream) => {
            const prevStream = prevStreams.find(s => s.id === stream.id);
            
            if (stream.latency > 60 && (!prevStream || prevStream.latency <= 60)) {
                newAlarms.push({
                    id: `latency.${stream.id}`,
                    type: 'latency',
                    severity: 'critical',
                    streamId: stream.id,
                    streamName: stream.name,
                    timestamp: Date.now(),
                    acknowledged: false,
                });
            } else if (stream.latency <= 60) {
                alarmsToRemove.push(`latency.${stream.id}`);
            }
            const isOffline = stream.bitrate === 0 && stream.latency === 0 && stream.packetLoss === 0;
            const wasOnline = prevStream && !(prevStream.bitrate === 0 && prevStream.latency === 0 && prevStream.packetLoss === 0);

            if (isOffline && wasOnline && !alarms.find(a => a.id === `disconnect.${stream.id}`)) {
                newAlarms.push({
                    id: `disconnect.${stream.id}`,
                    type: 'disconnect',
                    severity: 'critical',
                    streamId: stream.id,
                    streamName: stream.name,
                    timestamp: Date.now(),
                    acknowledged: false,
                });
            } else if (!isOffline) {
                alarmsToRemove.push(`disconnect.${stream.id}`);
            }


            if (stream.packetLoss > 1 &&  (!prevStream || prevStream.packetLoss <= 1)) {
                newAlarms.push({
                    id: `packetLoss.${stream.id}`,
                    type: 'packetLoss',
                    severity: 'critical',
                    streamId: stream.id,
                    streamName: stream.name,
                    timestamp: Date.now(),
                    acknowledged: false,
                });
                } else if (stream.packetLoss <= 1) {
                    alarmsToRemove.push(`packetLoss.${stream.id}`);
                }
        });

        if (newAlarms.length > 0) {
            setAlarms(prev => [...prev, ...newAlarms]);
        }
        if (alarmsToRemove.length > 0) {
            setAlarms(prev => prev.filter(alarm => !alarmsToRemove.includes(alarm.id)));
        }
        setPrevStreams(streams);
    }, []);

    const dismissAlarm = useCallback((id: string) => {
        setAlarms(prev => prev.filter(alarm => alarm.id !== id));
    }, []);

    const acknowledgeAlarm = useCallback((id: string) => {
        setAlarms(prev => prev.map(alarm => alarm.id === id ? { ...alarm, acknowledged: true } : alarm));
    }, []);

    return (
        <AlarmContext.Provider value={{ alarms, detectAlarms, dismissAlarm, acknowledgeAlarm }}>
            {children}
        </AlarmContext.Provider>
    );
};

export const useAlarm = () => {
    const context = useContext(AlarmContext);
    if (!context) throw new Error('useAlarm must be used within an AlarmProvider');
    return context;
};
    

/*
const alarmsTest = [
    { id: 1, name: 'Stream 2 Degraded', severity: 'warning' },
    { id: 2, name: 'Stream 3 Unhealthy', severity: 'critical' },
    { id: 3, name: 'Stream 5 Unhealthy', severity: 'critical' },
    { id: 4, name: 'Stream 1 Offline', severity: 'critical' },
    { id: 5, name: 'Stream 4 Degraded', severity: 'warning' },
]*/


export const AlarmPanel = () => {
    const { alarms, dismissAlarm, acknowledgeAlarm } = useAlarm();

    return (
        <div className="alarm-panel">
            <h2>Active Alarms ({alarms.length})</h2>
            {alarms.length === 0 ? (
                <p>No active alarms</p>
            ) : (
                <div className="alarm-grid">
                    {alarms.map((alarm) => (
                    <div key={alarm.id} className={`alarm ${alarm.severity}`}>
                        <div>
                            <strong>{alarm.type}</strong>
                            <p>{alarm.streamName}</p>
                            <small>{new Date(alarm.timestamp).toLocaleTimeString()}</small>
                        </div>
                        <div>
                            <input type="checkbox" checked={alarm.acknowledged} onChange={() => acknowledgeAlarm(alarm.id)} />
                            <button onClick= {() => dismissAlarm(alarm.id)}>X</button>
                        </div>
                    </div>
                ))}        
            </div>
            )}
        </div>
    )
}