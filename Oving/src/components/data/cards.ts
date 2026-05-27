import type { StreamCard } from '../../type';

export const cards: StreamCard[] = [
    { id: 'stream-1',
    name: 'NRK Oslo Feed',
    status: 'healthy',
    bitrate: 12.4,
    latency: 32,
    packetLoss: 0.2,
    uptime: '04:12:22',
    region: 'EU-NORTH'
    },
    { id: 'stream-2',
    name: 'NRK Bergen Feed',
    status: 'degraded',
    bitrate: 8.7,
    latency: 45,
    packetLoss: 0.5,
    uptime: '02:45:10',
    region: 'EU-WEST'
    },
    { id: 'stream-3',
    name: 'NRK Trondheim Feed',
    status: 'unhealthy',
    bitrate: 5.3,
    latency: 60,
    packetLoss: 1.2,
    uptime: '01:20:45',
    region: 'EU-NORTH'
    },
    { id: 'stream-4',
    name: 'NRK Stavanger Feed',
    status: 'healthy',
    bitrate: 10.1,
    latency: 38,
    packetLoss: 0.3,
    uptime: '03:45:20',
    region: 'EU-WEST'
    },
    { id: 'stream-5',
    name: 'NRK Tromsø Feed',
    status: 'unhealthy',
    bitrate: 6.8,
    latency: 55,
    packetLoss: 0.9,
    uptime: '02:10:30',
    region: 'EU-NORTH'
    },
    { id: 'stream-6',
    name: 'NRK Kristiansand Feed',
    status: 'healthy',
    bitrate: 9.2,
    latency: 40,
    packetLoss: 0.1,
    uptime: '03:15:45',
    region: 'EU-WEST'
    }
]