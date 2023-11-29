import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import Redis from 'ioredis'
import Redlock from 'redlock'

@Injectable()
export class RedlockService {
  private readonly redlock: Redlock

  constructor(private readonly configService: ConfigService) {
    const redis = new Redis({
      host: this.configService.get('REDIS_HOST'),
      port: this.configService.get('REDIS_PORT'),
      db: 0, //目标库,
      password: this.configService.get('REDIS_PASSPORT'),
    })

    this.redlock = new Redlock([redis], {
      driftFactor: 0.01,
      retryCount: 10,
      retryDelay: 200,
      retryJitter: 200,
    })
  }
  getRedlockInstance() {
    return this.redlock
  }
}
