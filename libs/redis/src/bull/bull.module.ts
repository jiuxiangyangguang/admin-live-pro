import { BullModule } from '@nestjs/bull'
import { Module } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { RedisCacheModule } from '../redis-cache/redis-cache.module'
import { RedisCacheService } from '../redis-cache/redis-cache.service'
import { ShoppingProcessor } from './audio.processor'

@Module({
  imports: [
    BullModule.forRootAsync({
      imports: [ConfigModule, RedisCacheModule], // 引入 RedisCacheModule
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => {
        return {
          redis: {
            host: configService.get('REDIS_HOST'),
            port: configService.get('REDIS_PORT'),
            db: 0, //目标库,
            password: configService.get('REDIS_PASSPORT'), // 密码,没有可以不写
          },
        }
      },
    }),
  ],
  providers: [ShoppingProcessor, RedisCacheService], // 添加 RedisCacheService
  exports: [ShoppingProcessor],
})
export class MyBullModule {}
