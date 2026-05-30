import type { StreamCard } from '../../type';

export const cards: StreamCard[] = [
    { id: 'stream-1',
    name: 'NRK Oslo Feed',
    bitrate: 0,
    latency: 0,
    packetLoss: 0,
    region: 'EU-NORTH'
    },
    { id: 'stream-2',
    name: 'NRK Bergen Feed',
    bitrate: 8.7,
    latency: 45,
    packetLoss: 0.5,
    region: 'EU-WEST'
    },
    { id: 'stream-3',
    name: 'NRK Trondheim Feed',
    bitrate: 5.3,
    latency: 60,
    packetLoss: 1.2,
    region: 'EU-NORTH'
    },
    { id: 'stream-4',
    name: 'NRK Stavanger Feed',
    bitrate: 10.1,
    latency: 38,
    packetLoss: 0.3,
    region: 'EU-WEST'
    },
    { id: 'stream-5',
    name: 'NRK Tromsø Feed',
    bitrate: 6.8,
    latency: 55,
    packetLoss: 0.9,
    region: 'EU-NORTH'
    },
    { id: 'stream-6',
    name: 'NRK Kristiansand Feed',
    bitrate: 9.2,
    latency: 40,
    packetLoss: 0.1,
    region: 'EU-WEST'
    }
]