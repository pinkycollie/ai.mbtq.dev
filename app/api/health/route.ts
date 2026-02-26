import { NextResponse } from 'next/server'

interface HealthStatus {
  status: 'healthy' | 'degraded' | 'unhealthy'
  version: string
  timestamp: string
  uptime: number
  services: {
    [key: string]: {
      status: 'up' | 'down' | 'unknown'
      latency?: number
    }
  }
}

const startTime = Date.now()

export async function GET(): Promise<NextResponse<HealthStatus>> {
  const status: HealthStatus = {
    status: 'healthy',
    version: '2.0.0',
    timestamp: new Date().toISOString(),
    uptime: Math.floor((Date.now() - startTime) / 1000),
    services: {
      api: { status: 'up' },
      ai: { status: 'up' },
      accessibility: { status: 'up' },
    },
  }

  return NextResponse.json(status)
}
