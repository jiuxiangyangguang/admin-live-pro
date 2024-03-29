import { ConfigModules } from '@app/config'
import { RedisModule, RedisModuleOptions } from '@liaoliaots/nestjs-redis'
import { Global, Module } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { RedisCacheService } from './redis-cache.service'

@Global()
@Module({
  imports: [
    ConfigModules,
    RedisModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (
        configService: ConfigService,
      ): Promise<RedisModuleOptions> => {
        return {
          config: {
            host: configService.get('REDIS_HOST'),
            port: configService.get('REDIS_PORT'),
            db: 0, //目标库,
            password: configService.get('REDIS_PASSPORT'), // 密码,没有可以不写
          },
        }
      },
    }),
  ],
  providers: [RedisCacheService],
  exports: [RedisCacheService],
})
export class RedisCacheModule {}
