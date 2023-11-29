import { ConfigModules } from '@app/config'
import { RedisCacheModule } from '@app/redis/redis-cache/redis-cache.module'
import { Module } from '@nestjs/common'
import { LiveServerController } from './live-server.controller'
import { LiveService } from './live-server.service'

@Module({
  imports: [ConfigModules, RedisCacheModule],
  controllers: [LiveServerController],
  providers: [LiveService],
})
export class LiveServerModule {}
