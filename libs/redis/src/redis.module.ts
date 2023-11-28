import { Module } from '@nestjs/common'
import { RedisCacheModule } from './redis-cache/redis-cache.module'
import { RedlockModule } from './redis-lock/redis-lock.module'

@Module({
  imports: [RedlockModule, RedisCacheModule],
})
export class RedisModule {}
