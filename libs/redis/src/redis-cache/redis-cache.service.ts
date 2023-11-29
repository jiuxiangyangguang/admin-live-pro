import { InjectRedis } from '@liaoliaots/nestjs-redis'
import { Injectable } from '@nestjs/common'
import Redis from 'ioredis'

@Injectable()
export class RedisCacheService {
  constructor(
    // private readonly redisService: RedisService,
    @InjectRedis() private readonly client: Redis,
  ) {}

  async cacheSet(key: string, value: string, ttl: number): Promise<string> {
    // const client = this.redisService.getClient()
    await this.client.set(key, value, 'EX', ttl)
    return value
  }

  async cacheSetNX(key: string, value: string, ttl: number): Promise<string> {
    // const client = this.redisService.getClient()
    return await this.client.set(key, value, 'EX', ttl, 'NX')
  }

  async cacheGet(key: string): Promise<any> {
    // const client = this.redisService.getClient()
    return this.client.get(key)
  }

  async cacheDel(key: string): Promise<any> {
    // const client = this.redisService.getClient()
    return this.client.del(key)
  }

  async cacheDecr(key: string): Promise<any> {
    // const client = this.redisService.getClient()
    return this.client.decr(key)
  }

  async cacheAddToSet(key: string, value: string): Promise<number> {
    return this.client.sadd(key, value)
  }

  async cacheGetSet(key: string): Promise<string[]> {
    return this.client.smembers(key)
  }
}
